import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GifItem } from "@/data/media";
import { X, Download, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

interface GifModalProps {
  gif: GifItem | null;
  onClose: () => void;
}

const GifModal = ({ gif, onClose }: GifModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!gif) return null;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = gif.src;
    a.download = gif.filename;
    a.click();
    toast.success("Download started!");
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${gif.src}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${gif.src}`;
    if (navigator.share) {
      await navigator.share({ title: gif.filename, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] max-w-2xl w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5"
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground transition-all hover:text-foreground hover:bg-background backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </button>

          <img src={gif.src} alt={gif.filename} className="w-full" />

          <div className="border-t border-border p-4 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {gif.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <p className="flex-1 text-sm text-muted-foreground truncate">{gif.filename}</p>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:neon-glow-purple hover:scale-105"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-secondary hover:text-secondary"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GifModal;
