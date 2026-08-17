export type MediaItem =
  | { kind: "youtube"; id: string; url: string }
  | { kind: "instagram"; id: string; url: string }
  | { kind: "site"; title: string; url: string; img: string };

export const mainVideo: MediaItem = {
  kind: "youtube",
  id: "Fp3g5hr6RAU",
  url: "https://youtu.be/Fp3g5hr6RAU",
};

export const shortVideos: MediaItem[] = [
  { kind: "youtube", id: "uLMkjJjTc9s", url: "https://www.youtube.com/shorts/uLMkjJjTc9s" },
  { kind: "youtube", id: "0kBfVG1fZxs", url: "https://www.youtube.com/shorts/0kBfVG1fZxs" },
];

export const onesikerItems: MediaItem[] = [
  { kind: "site", title: "onesiker.org", url: "https://onesiker.org", img: "onesiker-preview.png" },
  { kind: "instagram", id: "DbVV4h1C8au", url: "https://www.instagram.com/reel/DbVV4h1C8au/" },
  { kind: "instagram", id: "DYbmc6UiU-X", url: "https://www.instagram.com/reel/DYbmc6UiU-X/" },
  { kind: "instagram", id: "DZhYxvCiM_7", url: "https://www.instagram.com/reel/DZhYxvCiM_7/" },
  { kind: "instagram", id: "DZNcPmYigB0", url: "https://www.instagram.com/reel/DZNcPmYigB0/" },
  { kind: "instagram", id: "DYeWSwHiHQW", url: "https://www.instagram.com/reel/DYeWSwHiHQW/" },
];

export function itemKey(item: MediaItem) {
  return item.kind === "site" ? item.url : item.id;
}

export function thumbUrl(item: MediaItem, base: string) {
  if (item.kind === "youtube") return `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`;
  if (item.kind === "instagram") return `${base}reels/reel-${item.id}.jpg`;
  return `${base}${item.img}`;
}

export function platformLabel(item: MediaItem) {
  if (item.kind === "youtube") return "YouTube";
  if (item.kind === "instagram") return "Instagram";
  return "onesiker.org";
}
