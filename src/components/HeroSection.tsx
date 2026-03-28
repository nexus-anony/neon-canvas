import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, Sparkles, Zap, Eye } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: Sparkles, value: "10+", label: "GIFs Created" },
  { icon: Zap, value: "4+", label: "AMV Edits" },
  { icon: Eye, value: "1K+", label: "Views" },
];

const AnimatedCounter = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const num = parseInt(target);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || isNaN(num)) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible, num]);

  return <span ref={ref}>{isNaN(num) ? target : count}{suffix}</span>;
};

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-20 scale-110" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid opacity-15" />
      </motion.div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/8 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-secondary/8 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 h-40 w-40 rounded-full bg-primary/5 blur-[80px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3" />
          GIPHY Creator • AMV Editor
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
          className="mb-6 text-5xl font-black sm:text-7xl md:text-8xl lg:text-9xl gradient-text text-glow-purple leading-none"
        >
          Nexus Edits
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mb-10 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Creating high-impact anime edits and seamless looping GIFs for Instagram & GIPHY
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#gifs"
            className="group relative w-full sm:w-auto rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:neon-glow-purple-strong hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">View GIFs</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 transition-opacity group-hover:opacity-100 animate-[shimmer_2s_infinite]" />
          </a>
          <a
            href="#edits"
            className="w-full sm:w-auto rounded-xl border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-secondary hover:text-secondary hover:neon-glow-cyan"
          >
            Watch Edits
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 sm:mt-20 flex items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map(({ icon: Icon, value, label }) => {
            const suffix = value.replace(/\d/g, "");
            return (
              <div key={label} className="text-center group">
                <Icon className="mx-auto mb-2 h-5 w-5 text-primary/60 transition-colors group-hover:text-primary" />
                <p className="text-2xl sm:text-3xl font-black text-foreground">
                  <AnimatedCounter target={value} suffix={suffix} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground/50" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
