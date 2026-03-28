import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, filterGifs, type GifItem } from "@/data/media";
import GifCard from "./GifCard";
import GifModal from "./GifModal";

const GifGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedGif, setSelectedGif] = useState<GifItem | null>(null);

  const filteredGifs = filterGifs(activeCategory);

  return (
    <section id="gifs" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-4xl font-bold gradient-text">GIF Gallery</h2>
          <p className="text-muted-foreground">High-quality anime GIFs optimized for sharing</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-medium capitalize transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground neon-glow-purple"
                  : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {filteredGifs.map((gif, i) => (
              <GifCard
                key={gif.filename}
                gif={gif}
                index={i}
                onClick={() => setSelectedGif(gif)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGifs.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No GIFs found for this category. Add GIFs to <code className="text-primary">/public/gifs/</code>
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedGif && (
        <GifModal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </section>
  );
};

export default GifGallery;
