import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { edits, type EditItem } from "@/data/media";
import { Play, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const EditCard = ({ edit, index, onClick }: { edit: EditItem; index: number; onClick: () => void }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-secondary/50 hover:neon-glow-cyan"
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
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-full bg-secondary/20 p-4 backdrop-blur-sm">
          <Play className="h-6 w-6 text-secondary" />
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedEdits = () => {
  const [selectedEdit, setSelectedEdit] = useState<EditItem | null>(null);
  const featured = edits.filter((e) => e.featured).slice(0, 5);

  return (
    <section id="edits" className="py-24 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-4xl font-bold">
            Featured <span className="text-glow-cyan text-secondary">Edits</span>
          </h2>
          <p className="text-muted-foreground">Selected AMV edits showcasing editing skills</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full overflow-hidden rounded-xl border border-border bg-card"
            >
              <button
                onClick={() => setSelectedEdit(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <video
                src={selectedEdit.src}
                controls
                autoPlay
                loop
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
