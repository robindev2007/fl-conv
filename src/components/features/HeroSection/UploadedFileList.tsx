import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { P } from "@/components/ui/typography";
import { XIcon } from "lucide-react";
import { FileState } from "./ConverterDropzone";

const UploadedFileList = ({
  files,
  setFiles,
}: {
  files: FileState[];
  setFiles: React.Dispatch<React.SetStateAction<FileState[]>>;
}) => {
  const removeFile = (fileToRemove: FileState) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileToRemove.file.name)
    );
  };

  const updateFileOutputFormat = (fileToUpdate: FileState, value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.file.name === fileToUpdate.file.name
          ? { ...file, outputFormat: value }
          : file
      )
    );
  };

  const convertAll = () => {
    // Conversion logic goes here
    console.log("Converting files:", files);
  };

  return (
    <div className="space-y-5">
      <div className="gap-2 w-full flex flex-col">
        {files.map((file) => (
          <Card className="p-3 flex gap-2 flex-row items-center justify-between">
            <div className="flex text-sm">
              <P className="max-w-[40vw] truncate">
                {file.file.name.split(".")[0]}
              </P>
              <P>.{file.file.name.split(".")[1]}</P>
            </div>
            <div className="flex item-center relative gap-3">
              <Select
                value={file.outputFormat}
                onValueChange={(value) => updateFileOutputFormat(file, value)}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent align="end" draggable>
                  <SelectGroup>
                    <SelectLabel>Formats</SelectLabel>
                    <SelectItem value="apple">PNG</SelectItem>
                    <SelectItem value="banana">JPEG</SelectItem>
                    <SelectItem value="blueberry">WEBP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <Button
                  onClick={() => removeFile(file)}
                  size="icon"
                  variant={"destructive"}>
                  <XIcon />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={convertAll} className="w-full">
        Convert
      </Button>
    </div>
  );
};

export default UploadedFileList;
