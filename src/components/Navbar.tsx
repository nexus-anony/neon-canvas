import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "GIFs", href: "#gifs" },
  { label: "Edits", href: "#edits" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="Nexus Edits" width={32} height={32} />
          <span className="text-lg font-bold gradient-text">Nexus Edits</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="https://instagram.com/nexus_edi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:neon-glow-purple"
        >
          @nexus_edi
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
