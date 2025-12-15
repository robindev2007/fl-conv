import sharp, { FormatEnum } from "sharp";

export const ConvertFile = async (
  file: File,
  format: string
): Promise<File> => {
  const res = await sharp(Buffer.from(await file.arrayBuffer()), {
    limitInputPixels: false,
  }).toFormat(format as keyof FormatEnum);

  const metadata = await res.metadata();

  const pipeline =
    (metadata.width ?? 0) > 8192 || (metadata.height ?? 0) > 8192
      ? res.resize({
          width: 8192,
          height: 8192,
          fit: "inside",
          withoutEnlargement: true,
        })
      : res;
  // Convert to WebP safely
  const convertedBuffer = await pipeline
    .webp({
      quality: 80,
      lossless: false,
      effort: 4,
    })
    .toBuffer();

  // Buffer → Uint8Array (Blob-compatible)
  const uint8Array = new Uint8Array(convertedBuffer);

  return new File([uint8Array], "example.webp", {
    type: `image/${format}`,
  });
};
