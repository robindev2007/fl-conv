import { isValidConversion } from "@/constant";
import { ConvertFile } from "@/lib/file-converter";

const convertFile = async (file: File, format: string): Promise<File> => {
  const inputFormat = file.type.includes("image")
    ? file.type.split("/")[1]
    : file.type.includes("application/")
    ? file.type.split("/")[1]
    : null;

  const [uriOutputFormat, outPutFormat] = format.split("-to-");

  if (!inputFormat || !uriOutputFormat || !outPutFormat) {
    throw new Error("Invalid format");
  }

  if (uriOutputFormat !== inputFormat) {
    throw new Error("Input format does not match the file format");
  }

  console.log({ inputFormat, outPutFormat, uriOutputFormat });

  if (!isValidConversion(inputFormat, outPutFormat)) {
    throw new Error("Not supported format");
  }

  return await ConvertFile(file, outPutFormat);
};

export const FileConverterService = {
  convertFile,
};
