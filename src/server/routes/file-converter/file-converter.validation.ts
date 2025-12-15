import { t } from "elysia";

const convertFileBody = t.Object({
  file: t.File({}),
});

const convertFileParams = t.Object({
  "from-to": t.String(),
});

export const FileConverterValidation = {
  convertFileBody,
  convertFileParams,
};
