import { motion } from "framer-motion";
import { Instagram, Globe, Palette, Film, Sparkles, Layers } from "lucide-react";

const tools = [
  { name: "After Effects", icon: Film, desc: "Motion & VFX" },
  { name: "Premiere Pro", icon: Layers, desc: "Video Editing" },
  { name: "Photoshop", icon: Palette, desc: "Graphics" },
];

const skills = ["AMV Editing", "GIF Creation", "Color Grading", "Motion Graphics", "Typography", "Compositing"];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Creator
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text">About Me</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 backdrop-blur-sm"
          >
            <p className="mb-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
              I create anime edits and high-quality looping GIFs optimized for platforms like Instagram and GIPHY. 
              Passionate about bringing anime scenes to life through creative editing and visual storytelling.
            </p>

            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com/nexus_edi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:neon-glow-purple hover:scale-105"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-secondary hover:text-secondary"
              >
                <Globe className="h-4 w-4" /> GIPHY
              </a>
            </div>
          </motion.div>

          {/* Tools card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:neon-glow-purple">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
                <Sparkles className="ml-auto h-4 w-4 text-muted-foreground/30 transition-colors group-hover:text-primary" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
