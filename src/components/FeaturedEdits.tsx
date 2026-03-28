import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { edits, type EditItem } from "@/data/media";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const EditCard = ({ edit, index, onClick }: { edit: EditItem; index: number; onClick: () => void }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-secondary/50 hover:neon-glow-cyan"
    >
      {error ? (
        <div className="flex aspect-video items-center justify-center bg-muted">
          <div className="text-center p-4">
            <Play className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{edit.filename}</p>
            <p className="mt-1 text-xs text-secondary">Add to /public/edits</p>
          </div>
        </div>
      ) : (
        <video
          src={edit.src}
          muted
          autoPlay
          loop
          playsInline
          onError={() => setError(true)}
          className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Title bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 pt-10">
        <p className="text-sm font-semibold text-foreground">
          {edit.filename.replace(/\.\w+$/, "").replace(/([A-Z])/g, " $1").trim()}
        </p>
      </div>

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="rounded-full bg-secondary/20 p-5 backdrop-blur-md border border-secondary/30"
        >
          <Play className="h-7 w-7 text-secondary" fill="currentColor" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const FeaturedEdits = () => {
  const [selectedEdit, setSelectedEdit] = useState<EditItem | null>(null);
  const [muted, setMuted] = useState(true);
  const featured = edits.filter((e) => e.featured).slice(0, 5);

  return (
    <section id="edits" className="py-20 sm:py-24 bg-muted/10">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            Showcase
          </span>
          <h2 className="mb-3 text-3xl sm:text-4xl font-bold">
            Featured <span className="text-glow-cyan text-secondary">Edits</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">Selected AMV edits showcasing editing skills</p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          {featured.map((edit, i) => (
            <EditCard key={edit.filename} edit={edit} index={i} onClick={() => setSelectedEdit(edit)} />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEdit(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="absolute right-3 top-3 z-10 flex gap-2">
                <button
                  onClick={() => setMuted(!muted)}
                  className="rounded-full bg-background/80 p-2 text-muted-foreground hover:text-foreground backdrop-blur-sm"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setSelectedEdit(null)}
                  className="rounded-full bg-background/80 p-2 text-muted-foreground hover:text-foreground backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <video
                src={selectedEdit.src}
                controls
                autoPlay
                loop
                muted={muted}
                className="w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedEdits;
