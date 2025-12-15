import Elysia from "elysia";
import { FileConverterService } from "./file-converter.service";
import { FileConverterValidation } from "./file-converter.validation";

const router = new Elysia({ prefix: "/file-converter" });

router.post(
  "/convert/:from-to",
  async ({ body, params }) => {
    return await FileConverterService.convertFile(body.file, params["from-to"]);
  },
  {
    body: FileConverterValidation.convertFileBody,
    params: FileConverterValidation.convertFileParams,
  }
);

export const FileConverterRoutes = router;
