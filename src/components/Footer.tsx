import { Instagram, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-10 sm:py-12">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold gradient-text">Nexus Edits</p>
            <p className="mt-1 text-xs text-muted-foreground">AMV Editor • GIF Creator</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/nexus_edi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
              <span>@nexus_edi</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/30 pt-6 text-center">
          <p className="text-xs text-muted-foreground/60">© 2026 Nexus Edits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
