export type MediaItem =
  | { kind: "youtube"; id: string; url: string }
  | { kind: "instagram"; id: string; url: string };

export type YoutubeItem = Extract<MediaItem, { kind: "youtube" }>;

export const mainVideo: YoutubeItem = {
  kind: "youtube",
  id: "Fp3g5hr6RAU",
  url: "https://youtu.be/Fp3g5hr6RAU",
};

export const shortVideos: MediaItem[] = [
  { kind: "youtube", id: "uLMkjJjTc9s", url: "https://www.youtube.com/shorts/uLMkjJjTc9s" },
  { kind: "youtube", id: "0kBfVG1fZxs", url: "https://www.youtube.com/shorts/0kBfVG1fZxs" },
];

export const instagramItems: MediaItem[] = [];

export function itemKey(item: MediaItem) {
  return item.id;
}

export function thumbUrl(item: MediaItem, base: string) {
  if (item.kind === "youtube") return `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`;
  return `${base}reels/reel-${item.id}.jpg`;
}

export function platformLabel(item: MediaItem) {
  if (item.kind === "youtube") return "YouTube";
  return "Instagram";
}
