import { motion } from "framer-motion";
import type { GifItem } from "@/data/media";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";

interface GifCardProps {
  gif: GifItem;
  index: number;
  onClick: () => void;
}

const GifCard = ({ gif, index, onClick }: GifCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = gif.src;
    a.download = gif.filename;
    a.click();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/60 hover:neon-glow-purple"
    >
      {!loaded && !error && <Skeleton className="aspect-square w-full" />}
      {error ? (
        <div className="flex aspect-square items-center justify-center bg-muted">
          <div className="text-center p-4">
            <p className="text-xs text-muted-foreground">{gif.filename}</p>
            <p className="mt-1 text-xs text-primary">Add to /public/gifs</p>
          </div>
        </div>
      ) : (
        <img
          src={gif.src}
          alt={gif.filename}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          className={`aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Quick action buttons */}
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
        <button
          onClick={handleDownload}
          className="rounded-lg bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="rounded-lg bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Expand"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="w-full p-3">
          <p className="text-xs font-semibold text-foreground truncate">
            {gif.filename.replace(/\.\w+$/, "").replace(/[_-]/g, " ")}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {gif.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GifCard;
