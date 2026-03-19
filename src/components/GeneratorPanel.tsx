import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Play,
  Download,
  CloudDownload,
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Zap,
  Shield,
  Database,
  Info,
} from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

interface ResultData {
  primaryUrl: string;
  backupUrl: string;
  gameId: string;
  gameName?: string;
}

const CDN_BASE = "https://cdn.revobd.club/lua";
const BACKUP_BASE = "https://github.com/HasibulHasan098/Luagen/raw/main/lua";

const GeneratorPanel = () => {
  const [gameId, setGameId] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<ResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    const trimmed = gameId.trim();
    if (!trimmed) {
      toast({
        title: "Game ID required",
        description: "Please enter a valid Steam Game ID.",
        variant: "destructive",
      });
      return;
    }

    if (!/^\d+$/.test(trimmed)) {
      toast({
        title: "Invalid Game ID",
        description: "Steam Game IDs only contain numbers.",
        variant: "destructive",
      });
      return;
    }

    setState("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const primaryUrl = `${CDN_BASE}/${trimmed}.zip`;
      const backupUrl = `${BACKUP_BASE}/${trimmed}.zip`;

      // Try primary CDN check
      const response = await fetch(primaryUrl, { method: "HEAD" }).catch(() => null);

      if (response && response.ok) {
        setResult({ primaryUrl, backupUrl, gameId: trimmed });
        setState("success");
        toast({
          title: "Lua file found!",
          description: `Archive for Game ID ${trimmed} is ready.`,
        });
      } else {
        // Fallback: serve backup anyway
        setResult({ primaryUrl, backupUrl, gameId: trimmed });
        setState("success");
        toast({
          title: "Backup available",
          description: "Primary CDN unavailable. Backup download provided.",
        });
      }
    } catch {
      setState("error");
      setErrorMsg("Unable to reach servers. Please try again.");
      toast({
        title: "Request failed",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setGameId("");
    setErrorMsg("");
  };

  return (
    <div className="space-y-4">
      {/* Generator Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Lua Generator</CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Enter a Steam Game ID to get your Lua archive
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="game-id" className="text-sm font-medium text-foreground">
              Steam Game ID
            </Label>
            <div className="flex gap-2">
              <Input
                id="game-id"
                placeholder="e.g. 730, 570, 252490"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && state !== "loading" && handleGenerate()}
                className="font-mono bg-muted border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary"
                disabled={state === "loading"}
              />
              {state !== "success" ? (
                <Button
                  onClick={handleGenerate}
                  disabled={state === "loading" || !gameId.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 min-w-[110px] transition-fast"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted gap-2 min-w-[110px] transition-fast"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Info className="h-3 w-3 flex-shrink-0" />
              Find your Game ID on{" "}
              <a
                href="https://steamdb.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                steamdb.info <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </p>
          </div>

          {/* Loading State */}
          {state === "loading" && (
            <div className="rounded-lg border border-border bg-muted/30 p-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
                <div>
                  <p className="text-sm font-medium text-foreground">Searching CDN...</p>
                  <p className="text-xs text-muted-foreground">Checking 32,000+ Lua archives</p>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {state === "error" && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Generation Failed</p>
                  <p className="text-xs text-muted-foreground">{errorMsg}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {state === "success" && result && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Ready for download</p>
                    <p className="text-xs text-muted-foreground font-mono">Game ID: {result.gameId}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-fast"
                    asChild
                  >
                    <a href={result.primaryUrl} download>
                      <Download className="h-4 w-4" />
                      Download Lua Archive
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-muted gap-2 transition-fast"
                    asChild
                  >
                    <a href={result.backupUrl} download>
                      <CloudDownload className="h-4 w-4" />
                      Backup Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="border-border bg-card">
        <CardContent className="pt-4 pb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-primary font-mono">32K+</p>
              <p className="text-xs text-muted-foreground">Lua Archives</p>
            </div>
            <Separator orientation="vertical" className="h-10 mx-auto" />
            <div>
              <p className="text-lg font-bold text-foreground font-mono">100%</p>
              <p className="text-xs text-muted-foreground">Free</p>
            </div>
            <Separator orientation="vertical" className="h-10 mx-auto hidden" />
            <div>
              <p className="text-lg font-bold text-accent font-mono">CDN</p>
              <p className="text-xs text-muted-foreground">Powered</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium text-foreground">Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {[
            { label: "Instant Downloads", desc: "Files ready in seconds via CDN" },
            { label: "100% Free & Ad-Free", desc: "No hidden costs, no ads" },
            { label: "32,000+ Archives", desc: "Massive verified collection" },
            { label: "Backup System", desc: "GitHub fallback if CDN unavailable" },
            { label: "Cloudflare CDN", desc: "Ultra-fast global delivery" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-2.5">
              <div className="mt-0.5 h-4 w-4 flex-shrink-0 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">{f.label}</span>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="border-border bg-card">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Missing a file?{" "}
              <a href="mailto:contact@revobd.club" className="text-primary hover:underline">
                contact@revobd.club
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratorPanel;
