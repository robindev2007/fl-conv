import { openapi } from "@elysiajs/openapi";
import { Elysia, t } from "elysia";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 60;

const app = new Elysia({ prefix: "/api" }).use(openapi());
app.post(
  "/convert",
  async ({ body: { file } }) => {
    const fileArrayBuffer = await file.arrayBuffer();

    // Create sharp instance
    const image = sharp(Buffer.from(fileArrayBuffer), {
      limitInputPixels: false,
    });

    // Read metadata
    const metadata = await image.metadata();

    // Resize only if image is too large
    const pipeline =
      (metadata.width ?? 0) > 8192 || (metadata.height ?? 0) > 8192
        ? image.resize({
            width: 8192,
            height: 8192,
            fit: "inside",
            withoutEnlargement: true,
          })
        : image;

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
      type: "image/webp",
    });
  },
  {
    body: t.Object({
      file: t.File(),
    }),
  }
);

export const GET = app.fetch;
export const POST = app.fetch;

// Source - https://stackoverflow.com/a
// Posted by T.J, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-15, License - CC BY-SA 4.0

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
