import luagenLogo from "@/assets/luagen-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, BookOpen } from "lucide-react";

const LuagenHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img src={luagenLogo} alt="Luagen Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Lua<span className="text-primary">Gen</span>
          </span>
          <Badge variant="outline" className="ml-1 border-primary/40 text-primary text-[10px] font-mono px-1.5 py-0">
            v2.0
          </Badge>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-fast gap-2"
            asChild
          >
            <a href="https://steamdb.info/" target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-3.5 w-3.5" />
              SteamDB
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-fast gap-2"
            asChild
          >
            <a href="https://github.com/HasibulHasan098/Luagen" target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-muted transition-fast gap-2"
            asChild
          >
            <a href="https://www.steamtools.net/" target="_blank" rel="noopener noreferrer">
              Steam Tools
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default LuagenHeader;
