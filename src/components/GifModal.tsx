import { motion, AnimatePresence } from "framer-motion";
import type { GifItem } from "@/data/media";
import { X, Download, Copy } from "lucide-react";
import { toast } from "sonner";

interface GifModalProps {
  gif: GifItem | null;
  onClose: () => void;
}

const GifModal = ({ gif, onClose }: GifModalProps) => {
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] max-w-2xl w-full overflow-hidden rounded-xl border border-border bg-card"
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <img
            src={gif.src}
            alt={gif.filename}
            className="w-full"
          />

          <div className="flex items-center gap-3 border-t border-border p-4">
            <p className="flex-1 text-sm text-muted-foreground truncate">{gif.filename}</p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:neon-glow-purple"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-secondary hover:text-secondary"
            >
              <Copy className="h-3.5 w-3.5" /> Copy Link
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GifModal;
