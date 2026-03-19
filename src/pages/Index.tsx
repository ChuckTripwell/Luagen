import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  CloudDownload,
  RefreshCw,
  ExternalLink,
  HelpCircle,
  Star,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Server,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type State = "idle" | "loading" | "success" | "error";

const CDN_BASE = "https://cdn.revobd.club/lua";
const GITHUB_BASE = "https://github.com/HasibulHasan098/Luagen/raw/main/lua";
const KERNELOS_API = "https://kernelos.org/games/download.php";

interface DownloadUrls {
  primary: string;
  github: string;
  kernelos: string | null;
}

const Index = () => {
  const [gameId, setGameId] = useState("");
  const [state, setState] = useState<State>("idle");
  const [urls, setUrls] = useState<DownloadUrls>({ primary: "", github: "", kernelos: null });
  const [errorMsg, setErrorMsg] = useState("");
  

  const fetchKernelOS = async (id: string): Promise<string | null> => {
    try {
      const res = await fetch(`${KERNELOS_API}?gen=depotool&id=${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      if (data?.url) return `https://kernelos.org${data.url}`;
      return null;
    } catch {
      return null;
    }
  };

  const handleGenerate = async () => {
    const id = gameId.trim();

    if (!id) {
      setErrorMsg("Please enter a Steam Game ID.");
      setState("error");
      return;
    }
    if (!/^\d+$/.test(id)) {
      setErrorMsg("Steam Game IDs contain numbers only.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");
    setUrls({ primary: "", github: "", kernelos: null });

    try {
      const primaryUrl = `${CDN_BASE}/${id}.zip`;
      const githubUrl = `${GITHUB_BASE}/${id}.zip`;

      // Check CDN first
      const cdnRes = await fetch(primaryUrl, { method: "HEAD" }).catch(() => null);

      if (cdnRes?.ok) {
        setUrls({ primary: primaryUrl, github: githubUrl, kernelos: null });
        setState("success");
        return;
      }

      // CDN failed — check GitHub backup
      const ghRes = await fetch(githubUrl, { method: "HEAD" }).catch(() => null);

      if (ghRes?.ok) {
        setUrls({ primary: githubUrl, github: githubUrl, kernelos: null });
        setState("success");
        return;
      }

      // Both CDN & GitHub failed — try backup server 2
      const kernelosUrl = await fetchKernelOS(id);

      if (kernelosUrl) {
        setUrls({ primary: kernelosUrl, github: githubUrl, kernelos: kernelosUrl });
        setState("success");
        return;
      }

      // All sources failed
      setState("error");
      setErrorMsg("No Lua archive found for this Game ID across all servers.");
    } catch {
      setState("error");
      setErrorMsg("Unable to reach servers. Check your connection and try again.");
    }
  };

  const reset = () => {
    setState("idle");
    setGameId("");
    setUrls({ primary: "", github: "", kernelos: null });
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="text-base font-semibold tracking-tight text-foreground">LuaGen</span>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="https://steamdb.info/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
            SteamDB <ExternalLink className="h-3 w-3" />
          </a>
          <a href="https://github.com/HasibulHasan098/Luagen" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 transition-colors shrink-0"
                >
                  {state === "loading" ? <IosSpinner className="h-4 w-4" /> : "Generate"}
                </Button>
              ) : (
                <Button
                  onClick={reset}
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground transition-colors shrink-0 gap-1.5"
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
              Searching CDN, backup servers...
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
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-colors" asChild>
                  <a href={urls.primary} download>
                    <Download className="h-4 w-4" />
                    Download Lua Archive
                  </a>
                </Button>
                {urls.kernelos ? (
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground gap-2 transition-colors" asChild>
                    <a href={urls.kernelos} download>
                    <Server className="h-4 w-4" />
                      Backup Server 2
                    </a>
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground gap-2 transition-colors" asChild>
                    <a href={urls.github} download>
                      <CloudDownload className="h-4 w-4" />
                      GitHub Backup
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {state === "error" && (
            <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{errorMsg || "Something went wrong. Please try again."}</p>
            </div>
          )}

          {/* Accordions */}
          <div className="space-y-4 pt-2">
            <Separator className="bg-border" />

            <Accordion type="multiple" className="space-y-1">

              {/* How to Install */}
              <AccordionItem value="install" className="border border-border rounded-lg overflow-hidden px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4 gap-3">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    How to Install Lua Files
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  <ol className="space-y-3">
                    {[
                      { n: "1", t: "Download & Extract", d: 'After downloading, right-click the ZIP file and select "Extract All" or use your preferred extraction tool' },
                      { n: "2", t: "Download & Install Steam Tools", d: <span>Download Steam Tools from <a href="https://www.steamtools.net/" target="_blank" rel="noopener noreferrer" className="text-foreground underline">steamtools.net</a> and install it</span> },
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
                  <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 p-3">
                    <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Always backup your original files before installing new Lua files. Use game modifications responsibly and at your own risk.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

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
                      a: "Download and extract the ZIP file, install Steam Tools from steamtools.net, open it, drag all extracted files onto the Steam Tools icon, then restart Steam.",
                    },
                    {
                      q: "How do I find my game's Steam ID?",
                      a: "Visit the game's Steam store page — the number in the URL is your Game ID. You can also use steamdb.info to search.",
                    },
                    {
                      q: "Are these Lua files safe to use?",
                      a: "Yes, all Lua files are scanned and verified. However, always use game modifications responsibly and at your own discretion.",
                    },
                    {
                      q: "What if I can't find my game?",
                      a: "If no archive is found across all servers, please email us. We're constantly expanding our collection.",
                    },
                    {
                      q: "What servers are used?",
                      a: "We check our primary CDN, then a GitHub backup, and finally a third backup server — all automatically.",
                    },
                  ].map((item, i, arr) => (
                    <div key={i} className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{item.q}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                      {i < arr.length - 1 && <Separator className="bg-border mt-3" />}
                    </div>
                  ))}
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
                    { t: "Triple Fallback System", d: "CDN → GitHub Backup → Backup Server 2 — maximum availability" },
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
