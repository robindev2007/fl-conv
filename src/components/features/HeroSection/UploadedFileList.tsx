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

const UploadedFileList = ({ files }: { files: File[] }) => {
  return (
    <div className="gap-2 w-full flex flex-col">
      {files.map((file) => (
        <Card className="p-3 flex gap-2 flex-row items-center justify-between">
          <div className="flex text-sm">
            <P className="max-w-[40vw] truncate">{file.name.split(".")[0]}</P>
            <P>.{file.name.split(".")[1]}</P>
          </div>
          <div className="flex item-center gap-3">
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formats</SelectLabel>
                  <SelectItem value="apple">PNG</SelectItem>
                  <SelectItem value="banana">JPEG</SelectItem>
                  <SelectItem value="blueberry">WEBP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size="icon" variant={"destructive"}>
              <XIcon />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UploadedFileList;
