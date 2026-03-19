import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Download, CloudDownload, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type State = "idle" | "loading" | "success" | "error";

const CDN_BASE = "https://cdn.revobd.club/lua";
const BACKUP_BASE = "https://github.com/HasibulHasan098/Luagen/raw/main/lua";

const Index = () => {
  const [gameId, setGameId] = useState("");
  const [state, setState] = useState<State>("idle");
  const [urls, setUrls] = useState({ primary: "", backup: "" });
  const { toast } = useToast();

  const handleGenerate = async () => {
    const id = gameId.trim();
    if (!id || !/^\d+$/.test(id)) {
      toast({ title: "Enter a valid Steam Game ID", variant: "destructive" });
      return;
    }
    setState("loading");
    setUrls({ primary: "", backup: "" });
    try {
      const primary = `${CDN_BASE}/${id}.zip`;
      const backup = `${BACKUP_BASE}/${id}.zip`;
      await fetch(primary, { method: "HEAD" }).catch(() => null);
      setUrls({ primary, backup });
      setState("success");
    } catch {
      setState("error");
      toast({ title: "Request failed", description: "Check your connection.", variant: "destructive" });
    }
  };

  const reset = () => { setState("idle"); setGameId(""); setUrls({ primary: "", backup: "" }); };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />

      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">
            Lua<span className="text-primary">Gen</span>
          </span>
          <span className="text-xs font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">v2.0</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="https://steamdb.info/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-fast flex items-center gap-1">
            SteamDB <ExternalLink className="h-3 w-3" />
          </a>
          <a href="https://github.com/HasibulHasan098/Luagen" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-fast flex items-center gap-1">
            GitHub <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8">

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Lua File Generator</h1>
            <p className="text-sm text-muted-foreground">
              Enter a Steam Game ID to get your Lua archive instantly.
            </p>
          </div>

          {/* Input area */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Steam Game ID (e.g. 730)"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && state !== "loading" && handleGenerate()}
                disabled={state === "loading" || state === "success"}
                className="font-mono bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
              {state !== "success" ? (
                <Button
                  onClick={handleGenerate}
                  disabled={state === "loading" || !gameId.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 transition-fast shrink-0"
                >
                  {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
                </Button>
              ) : (
                <Button
                  onClick={reset}
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground transition-fast shrink-0 gap-1.5"
                >
                  <RefreshCw className="h-4 w-4" /> New
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Find your Game ID on{" "}
              <a href="https://steamdb.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                steamdb.info
              </a>
            </p>
          </div>

          {/* Loading */}
          {state === "loading" && (
            <div className="flex items-center justify-center gap-3 py-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Searching 32,000+ archives...
            </div>
          )}

          {/* Success */}
          {state === "success" && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm font-medium text-foreground">Archive found</span>
                <span className="text-xs font-mono text-muted-foreground ml-auto">ID: {gameId}</span>
              </div>
              <Separator className="bg-border" />
              <div className="space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-fast" asChild>
                  <a href={urls.primary} download>
                    <Download className="h-4 w-4" />
                    Download Lua Archive
                  </a>
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground gap-2 transition-fast" asChild>
                  <a href={urls.backup} download>
                    <CloudDownload className="h-4 w-4" />
                    Backup Download
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Error */}
          {state === "error" && (
            <p className="text-center text-sm text-destructive">
              Something went wrong. Please try again.
            </p>
          )}

          {/* How to install */}
          <div className="space-y-4 pt-4">
            <Separator className="bg-border" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">How to install</p>
            <ol className="space-y-3">
              {[
                { n: "1", t: "Download & Extract", d: "Right-click the ZIP → Extract All" },
                { n: "2", t: "Install Steam Tools", d: <a href="https://www.steamtools.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">steamtools.net</a> },
                { n: "3", t: "Drag & Drop Lua Files", d: "Select extracted files → drag onto Steam Tools icon" },
                { n: "4", t: "Restart Steam", d: "Fully close and relaunch Steam" },
              ].map((step) => (
                <li key={step.n} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-mono text-muted-foreground mt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <span className="text-sm text-foreground font-medium">{step.t}</span>
                    <p className="text-xs text-muted-foreground">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          LuaGen · Free & Open Source · Missing a file?{" "}
          <a href="mailto:contact@revobd.club" className="text-primary hover:underline">contact@revobd.club</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
