import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const tools = ["After Effects", "Premiere Pro"];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card/50 p-8 md:p-12 backdrop-blur-sm"
        >
          <h2 className="mb-6 text-3xl font-bold gradient-text">About</h2>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            I create anime edits and high-quality looping GIFs optimized for platforms like Instagram and GIPHY.
          </p>

          <div className="mb-8">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="https://instagram.com/nexus_edi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:neon-glow-purple hover:scale-105"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
