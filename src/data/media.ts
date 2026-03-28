// Media manifest — add your GIFs and edits here.
// Since Vite can't dynamically scan /public at runtime, list them manually.
// Tags are extracted from filenames: "naruto_action.gif" → ["naruto", "action"]

export interface GifItem {
  filename: string;
  tags: string[];
  src: string;
}

export interface EditItem {
  filename: string;
  src: string;
  featured: boolean;
}

function extractTags(filename: string): string[] {
  return filename
    .replace(/\.(gif|mp4|webm)$/, "")
    .split(/[_\-]/)
    .map((t) => t.toLowerCase());
}

// === ADD YOUR GIF FILENAMES HERE ===
const gifData = [
  { filename: "camellya-wuthering-waves (3).gif", tags: ["wuthering-waves", "camellya"] },
  { filename: "Demons.gif", tags: ["dark", "anime"] },
  { filename: "Finger.gif", tags: ["action", "anime"] },
  { filename: "Nilou.gif", tags: ["genshin-impact", "nilou"] },
  { filename: "phrolova-1.gif", tags: ["phrolova", "wuthering-waves"] },
  { filename: "phrolova-2.gif", tags: ["phrolova", "wuthering-waves"] },
  { filename: "Returns.gif", tags: ["action"] },
  { filename: "Screen.gif", tags: ["aesthetic"] },
  { filename: "Steals.gif", tags: ["action"] },
  { filename: "wuthering-waves-wuwa (1).gif", tags: ["wuthering-waves", "wuwa"] },
];

// === ADD YOUR EDIT FILENAMES HERE ===
const editFilenames = [
  "HookahBar.mp4",
  "Kompa.mp4",
  "SunSaathiya.mp4",
  "TumMile.mp4",
];

export const gifs: GifItem[] = gifData.map(({ filename, tags }) => ({
  filename,
  tags,
  src: `/gifs/${filename}`,
}));

export const edits: EditItem[] = editFilenames.map((filename) => ({
  filename,
  src: `/edits/${filename}`,
  featured: true,
}));

// Extract unique filter categories from tags
const categoryKeywords = ["wuthering-waves", "genshin-impact", "phrolova", "action", "anime", "aesthetic", "dark"];
export const categories = ["all", ...categoryKeywords];

export function filterGifs(category: string): GifItem[] {
  if (category === "all") return gifs;
  return gifs.filter((g) => g.tags.includes(category));
}
