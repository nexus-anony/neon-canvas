import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, filterGifs, type GifItem } from "@/data/media";
import { Search } from "lucide-react";
import GifCard from "./GifCard";
import GifModal from "./GifModal";

const GifGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedGif, setSelectedGif] = useState<GifItem | null>(null);
  const [search, setSearch] = useState("");

  const filteredGifs = filterGifs(activeCategory).filter((g) =>
    search ? g.filename.toLowerCase().includes(search.toLowerCase()) || g.tags.some((t) => t.includes(search.toLowerCase())) : true
  );

  return (
    <section id="gifs" className="py-20 sm:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Gallery
          </span>
          <h2 className="mb-3 text-3xl sm:text-4xl font-bold gradient-text">GIF Collection</h2>
          <p className="text-muted-foreground text-sm sm:text-base">High-quality anime GIFs optimized for sharing</p>
        </motion.div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="mx-auto max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search GIFs..."
              className="w-full rounded-xl border border-border bg-card/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-4 sm:px-5 py-2 text-xs font-medium capitalize transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground neon-glow-purple"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.replace("-", " ")}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="mb-4 text-xs text-muted-foreground text-center">
          {filteredGifs.length} {filteredGifs.length === 1 ? "GIF" : "GIFs"} found
        </p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {filteredGifs.map((gif, i) => (
              <GifCard key={gif.filename} gif={gif} index={i} onClick={() => setSelectedGif(gif)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGifs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">No GIFs found</p>
            <p className="mt-1 text-xs text-muted-foreground/60">Try a different search or filter</p>
          </motion.div>
        )}
      </div>

      {selectedGif && <GifModal gif={selectedGif} onClose={() => setSelectedGif(null)} />}
    </section>
  );
};

export default GifGallery;
