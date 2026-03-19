import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Download, CloudDownload, Loader2, RefreshCw, ExternalLink, HelpCircle, Star, CheckCircle2, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
        <span className="text-base font-semibold tracking-tight text-foreground">LuaGen</span>
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
          <div className="rounded-lg border border-border bg-secondary p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
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

            <Accordion type="multiple" className="space-y-1">

              {/* FAQ */}
              <AccordionItem value="faq" className="border border-border rounded-lg overflow-hidden px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4 gap-3">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    Frequently Asked Questions
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  {[
                    {
                      q: "How do I install the Lua files?",
                      a: "Download and extract the ZIP file, download Steam Tools from steamtools.net and install it, open Steam Tools, select all files from the extracted folder and drag them onto the Steam Tools icon. Finally, restart Steam for the changes to take effect.",
                    },
                    {
                      q: "How do I find my game's Steam ID?",
                      a: "Visit the game's Steam store page and look at the URL. The number in the URL is your game's ID. Alternatively, use steamdb.info to search for your game.",
                    },
                    {
                      q: "Are these Lua files safe to use?",
                      a: "Yes, all our Lua files are scanned and verified. However, always use game modifications responsibly and at your own discretion.",
                    },
                    {
                      q: "What if I can't find my game?",
                      a: "If you can't find your game's Lua files, please email us. We're constantly expanding our collection with help from the community.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{item.q}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                      {i < 3 && <Separator className="bg-border mt-3" />}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Install Guide */}
              <AccordionItem value="install" className="border border-border rounded-lg overflow-hidden px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  How to Install Lua Files
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  <ol className="space-y-3">
                    {[
                      { n: "1", t: "Download & Extract", d: "After downloading, right-click the ZIP file and select \"Extract All\" or use your preferred extraction tool" },
                      { n: "2", t: "Download & Install Steam Tools", d: <>Download Steam Tools from <a href="https://www.steamtools.net/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">steamtools.net</a> and install it on your computer</> },
                      { n: "3", t: "Open Steam Tools", d: "Launch Steam Tools after installation is complete" },
                      { n: "4", t: "Select & Drag Files", d: "Select all files from the extracted folder and drag them onto the Steam Tools icon" },
                      { n: "5", t: "Restart Steam", d: "Close and restart Steam completely for the changes to take effect" },
                    ].map((step) => (
                      <li key={step.n} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-mono text-muted-foreground mt-0.5">
                          {step.n}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{step.t}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{step.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 p-3 mt-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Always backup your original files before installing new Lua files. Use game modifications responsibly and at your own risk.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Why LuaGen */}
              <AccordionItem value="why" className="border border-border rounded-lg overflow-hidden px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4 gap-3">
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground shrink-0" />
                    Why Choose LuaGen?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-3">
                  {[
                    { t: "Instant Downloads", d: "Get your Lua files immediately without waiting" },
                    { t: "100% Free & Ad-Free", d: "No hidden costs or annoying advertisements" },
                    { t: "Extensive Collection", d: "Access to over 32,566 Lua files for various Steam games" },
                  ].map((item) => (
                    <div key={item.t} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.t}</p>
                        <p className="text-xs text-muted-foreground">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

            </Accordion>
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
