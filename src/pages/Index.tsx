import LuagenHeader from "@/components/LuagenHeader";
import GeneratorPanel from "@/components/GeneratorPanel";
import InstallGuide from "@/components/InstallGuide";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <LuagenHeader />

      {/* Hero Banner */}
      <div className="border-b border-border bg-card/40">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                Free & Open Source
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground">
                32,000+ archives
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Lua File Generator for Steam Games
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter a Steam Game ID and instantly get a verified Lua archive. Powered by Cloudflare CDN with
              an automatic GitHub backup — fast, reliable, and completely free.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout: Two-column split */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left: Generator (40%) */}
          <div className="lg:col-span-2">
            <GeneratorPanel />
          </div>

          {/* Right: Install Guide & FAQ (60%) */}
          <div className="lg:col-span-3">
            <InstallGuide />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
