import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, ExternalLink } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Download & Extract",
    desc: "After downloading, right-click the ZIP file and select \"Extract All\" or use 7-Zip/WinRAR.",
    code: "Right-click → Extract All → Choose folder",
  },
  {
    step: "02",
    title: "Install Steam Tools",
    desc: "Download Steam Tools from steamtools.net and run the installer.",
    link: { label: "steamtools.net", href: "https://www.steamtools.net/" },
  },
  {
    step: "03",
    title: "Open Steam Tools",
    desc: "Launch Steam Tools after installation is complete.",
    code: "Start Menu → Steam Tools → Launch",
  },
  {
    step: "04",
    title: "Drag & Drop Lua Files",
    desc: "Select all extracted Lua files and drag them onto the Steam Tools executable icon.",
    code: "Select all files → Drag onto SteamTools.exe",
  },
  {
    step: "05",
    title: "Restart Steam",
    desc: "Fully close and restart Steam to apply the Lua modifications.",
    code: "Steam → Exit → Relaunch Steam",
  },
];

const faqs = [
  {
    q: "How do I find my Game's Steam ID?",
    a: "Go to steamdb.info, search for your game. The Game ID is in the URL: store.steampowered.com/app/[ID]/GameName/",
  },
  {
    q: "Are these files safe?",
    a: "All Lua archives are community-tested and scanned. Always backup your original files before applying any modifications.",
  },
  {
    q: "What if my Game ID isn't found?",
    a: "Try the backup download link. If neither works, email contact@revobd.club — the team regularly adds new archives.",
  },
  {
    q: "Will this work on all Steam games?",
    a: "LuaGen covers 32,000+ games. Games not yet in the collection can be requested via email.",
  },
];

const InstallGuide = () => {
  return (
    <div className="space-y-4">
      {/* Terminal / Code output feel header */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/40" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-2">luagen — install-guide.sh</span>
        </div>
        <div className="p-4 font-mono text-sm space-y-1.5">
          <p className="text-muted-foreground text-xs"># LuaGen Quick Start</p>
          <p>
            <span className="text-accent">$</span>{" "}
            <span className="text-foreground">luagen generate</span>{" "}
            <span className="text-primary">--game-id</span>{" "}
            <span className="text-accent">730</span>
          </p>
          <p className="text-muted-foreground text-xs">→ Checking CDN... ✓ Found archive</p>
          <p className="text-muted-foreground text-xs">→ Ready: cs2_lua_730.zip (2.4 MB)</p>
          <p>
            <span className="text-accent">$</span>{" "}
            <span className="text-muted-foreground">_</span>
          </p>
        </div>
      </div>

      {/* Installation Steps */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted border border-border">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Installation Guide</CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Follow these steps to apply your Lua files
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((s, i) => (
            <div key={s.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <span className="text-xs font-mono font-bold text-primary">{s.step}</span>
                </div>
                {i < steps.length - 1 && <div className="mt-1 h-full w-px bg-border min-h-[24px]" />}
              </div>
              <div className="pb-4 flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
                {s.code && (
                  <code className="block rounded-md bg-muted/50 border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground">
                    {s.code}
                  </code>
                )}
                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                  >
                    {s.link.label} <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))}

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 mt-2">
            <p className="text-xs text-yellow-400 font-medium">⚠ Warning</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Always backup your original Steam files before applying any Lua modifications.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-1">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-sm text-foreground hover:text-foreground hover:no-underline py-3 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pb-3">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-2">
        <p className="text-xs text-muted-foreground">
          LuaGen © 2025 · Free & Open Source ·{" "}
          <a
            href="https://github.com/HasibulHasan098/Luagen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export default InstallGuide;
