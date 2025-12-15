"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDropzone } from "@/components/ui/file-dropzone";
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
import { SupportedConverters, SupportedFrom, SupportedTo } from "@/constant";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export type FileWithFormat = {
  file: File;
  outputFormat: string;
  isConverted: boolean;
};

export interface ReuseableFileConverterProps {
  /**
   * Optional: Pre-set the source format (from which format to convert)
   */
  from?: SupportedFrom;

  /**
   * Optional: Pre-set the target format (to which format to convert)
   */
  to?: SupportedTo;

  /**
   * Callback function triggered when user clicks the Convert button
   * Returns the array of files with their selected output formats
   */
  onConvert?: (files: FileWithFormat[]) => void;

  /**
   * Maximum number of files allowed
   * @default 10
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes
   * @default 52428800 (50MB)
   */
  maxSize?: number;

  /**
   * Custom accept types for the file dropzone
   */
  accept?: Record<string, string[]>;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Show or hide the convert button
   * @default true
   */
  showConvertButton?: boolean;

  /**
   * Custom text for the convert button
   * @default "Convert All"
   */
  convertButtonText?: string;
}

const ReuseableFileConverter = ({
  from,
  to,
  onConvert,
  maxFiles = 10,
  maxSize = 52428800, // 50MB
  accept,
  className = "",
  showConvertButton = true,
  convertButtonText = "Convert All",
}: ReuseableFileConverterProps) => {
  const [files, setFiles] = useState<FileWithFormat[]>([]);

  // Get available output formats based on the 'from' prop or detected file extension
  const getAvailableFormats = (fileName: string): string[] => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const sourceFormat = from || fileExtension;

    const converter = SupportedConverters.find((c) => c.from === sourceFormat);
    return converter ? converter.to : [];
  };

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => {
      const availableFormats = getAvailableFormats(file.name);
      // If 'to' prop is provided and valid for this file, use it as default
      const defaultFormat = to && availableFormats.includes(to) ? to : "";

      return {
        file,
        outputFormat: defaultFormat,
        isConverted: false,
      };
    });

    setFiles(newFiles);
  };

  const removeFile = (fileToRemove: FileWithFormat) => {
    setFiles((prevFiles) =>
      prevFiles.filter((f) => f.file.name !== fileToRemove.file.name)
    );
  };

  const updateFileOutputFormat = (
    fileToUpdate: FileWithFormat,
    value: string
  ) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.file.name === fileToUpdate.file.name
          ? { ...f, outputFormat: value }
          : f
      )
    );
  };

  const handleConvert = () => {
    // Validate that all files have an output format selected
    const filesWithFormat = files.filter((f) => f.outputFormat);

    if (filesWithFormat.length === 0) {
      console.warn("No files with output format selected");
      return;
    }

    console.log({ files });

    // Call the onConvert callback with the files
    onConvert?.(filesWithFormat);
  };

  // Reset files when from/to props change
  useEffect(() => {
    if (files.length > 0 && to) {
      setFiles((prevFiles) =>
        prevFiles.map((f) => {
          const availableFormats = getAvailableFormats(f.file.name);
          return {
            ...f,
            outputFormat: availableFormats.includes(to) ? to : f.outputFormat,
          };
        })
      );
    }
  }, [to]);

  // Default accept types if not provided
  const defaultAccept = accept || {
    "image/*": [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".avif",
      ".tiff",
      ".heif",
    ],
  };

  return (
    <div className={`w-full mx-auto ${className}`}>
      {files.length > 0 ? (
        <div className="space-y-5">
          <div className="gap-2 w-full flex flex-col">
            {files.map((fileItem, index) => {
              const fileName = fileItem.file.name;
              const fileNameWithoutExt =
                fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
              const fileExt = fileName.split(".").pop() || "";
              const availableFormats = getAvailableFormats(fileName);

              return (
                <Card
                  key={`${fileItem.file.name}-${index}`}
                  className="p-3 flex gap-2 flex-row items-center justify-between">
                  <div className="flex text-sm items-center gap-1">
                    <P className="max-w-[40vw] truncate">
                      {fileNameWithoutExt}
                    </P>
                    <P className="text-muted-foreground">.{fileExt}</P>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={fileItem.outputFormat}
                      onValueChange={(value) =>
                        updateFileOutputFormat(fileItem, value)
                      }
                      disabled={to !== undefined} // Disable if 'to' is pre-set
                    >
                      <SelectTrigger className="w-35">
                        <SelectValue placeholder={"Select format"} />
                      </SelectTrigger>
                      <SelectContent align="end">
                        <SelectGroup>
                          <SelectLabel>Output Format</SelectLabel>
                          {availableFormats.length > 0 ? (
                            availableFormats.map((format) => (
                              <SelectItem key={format} value={format}>
                                {format.toUpperCase()}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No formats available
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => removeFile(fileItem)}
                      size="icon"
                      variant="destructive">
                      <XIcon />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {showConvertButton && (
            <Button
              onClick={handleConvert}
              className="w-full"
              disabled={files.every((f) => !f.outputFormat)}>
              {convertButtonText}
            </Button>
          )}
        </div>
      ) : (
        <FileDropzone
          onFilesSelected={handleFilesAccepted}
          maxFiles={maxFiles}
          maxSize={maxSize}
          accept={defaultAccept}
        />
      )}
    </div>
  );
};

export default ReuseableFileConverter;
