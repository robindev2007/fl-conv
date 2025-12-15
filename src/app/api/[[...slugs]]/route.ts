import { openapi } from "@elysiajs/openapi";
import { Elysia, t } from "elysia";
import sharp from "sharp";

const app = new Elysia({ prefix: "/api" }).use(openapi());

app.post(
  "/convert",
  async ({ body: { file } }) => {
    const fileArrayBuffer = await file.arrayBuffer();

    const convertedBuffer = await sharp(Buffer.from(fileArrayBuffer))
      .webp()
      .toBuffer();

    // Convert Buffer → Uint8Array (Blob-compatible)
    const uint8Array = new Uint8Array(convertedBuffer);

    const newFile = new File([uint8Array], "example.webp", {
      type: "image/webp",
    });

    return newFile;
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
      sizeLimit: "20mb",
    },
  },
};
