import { FileConverterRoutes } from "@/server/routes/file-converter/file-converter.route";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

export const runtime = "nodejs";
export const maxDuration = 60;

const app = new Elysia({ prefix: "/api" }).use(openapi());

app.use(FileConverterRoutes);
// app.post(
//   "/convert/:from-to",
//   async ({ body: { file }, params: { "from-to": fromTo } }) => {
//     const fileArrayBuffer = await file.arrayBuffer();

//     // Create sharp instance
//     const image = sharp(Buffer.from(fileArrayBuffer), {
//       limitInputPixels: false,
//     });

//     // Read metadata
//     const metadata = await image.metadata();

//     // Resize only if image is too large
//     const pipeline =
//       (metadata.width ?? 0) > 8192 || (metadata.height ?? 0) > 8192
//         ? image.resize({
//             width: 8192,
//             height: 8192,
//             fit: "inside",
//             withoutEnlargement: true,
//           })
//         : image;

//     // Convert to WebP safely
//     const convertedBuffer = await pipeline
//       .webp({
//         quality: 80,
//         lossless: false,
//         effort: 4,
//       })
//       .toBuffer();

//     // Buffer → Uint8Array (Blob-compatible)
//     const uint8Array = new Uint8Array(convertedBuffer);

//     return new File([uint8Array], "example.webp", {
//       type: "image/webp",
//     });
//   },
//   {
//     body: t.Object({
//       file: t.File({
//         type: "image/*",
//       }),
//     }),
//     params: t.Object({
//       "from-to": t.String(),
//     }),
//   }
// );
//

export const GET = app.fetch;
export const POST = app.fetch;
