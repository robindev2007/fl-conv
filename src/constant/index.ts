export const SupportedConverters = [
  {
    from: "jpg",
    to: ["jpeg", "png", "webp", "avif", "tiff", "heif"],
  },
  {
    from: "jpeg",
    to: ["jpg", "png", "webp", "avif", "tiff", "heif"],
  },
  {
    from: "png",
    to: ["jpg", "jpeg", "webp", "avif", "tiff", "heif"],
  },
  {
    from: "webp",
    to: ["jpg", "jpeg", "png", "avif", "tiff", "heif"],
  },
  {
    from: "avif",
    to: ["jpg", "jpeg", "png", "webp", "tiff", "heif"],
  },
  {
    from: "tiff",
    to: ["jpg", "jpeg", "png", "webp", "avif", "heif"],
  },
  {
    from: "heif",
    to: ["jpg", "jpeg", "png", "webp", "avif", "tiff"],
  },
];

export type SupportedFrom = (typeof SupportedConverters)[number]["from"];
export type SupportedTo = (typeof SupportedConverters)[number]["to"][number];

export function isValidConversion(from: string, to: string): boolean {
  return SupportedConverters.some((c) => c.from === from && c.to.includes(to));
}

export type SupportedConverter = (typeof SupportedConverters)[number];
