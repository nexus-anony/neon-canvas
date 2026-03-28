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
const gifFilenames = [
  "naruto_action.gif",
  "sad_itachi.gif",
  "romantic_sunset.gif",
  "nightcore_vibes.gif",
  "action_fight.gif",
  "sad_rain.gif",
  "romantic_kiss.gif",
  "action_explosion.gif",
  "nightcore_glow.gif",
];

// === ADD YOUR EDIT FILENAMES HERE ===
const editFilenames = [
  "amv_edit_01.mp4",
  "amv_edit_02.mp4",
  "amv_edit_03.mp4",
];

export const gifs: GifItem[] = gifFilenames.map((filename) => ({
  filename,
  tags: extractTags(filename),
  src: `/gifs/${filename}`,
}));

export const edits: EditItem[] = editFilenames.map((filename) => ({
  filename,
  src: `/edits/${filename}`,
  featured: true,
}));

// Extract unique filter categories from tags
const categoryKeywords = ["action", "sad", "romantic", "nightcore"];
export const categories = ["all", ...categoryKeywords];

export function filterGifs(category: string): GifItem[] {
  if (category === "all") return gifs;
  return gifs.filter((g) => g.tags.includes(category));
}
