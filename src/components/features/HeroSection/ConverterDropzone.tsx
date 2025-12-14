"use client";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { useState } from "react";
import UploadedFileList from "./UploadedFileList";

export type FileState = {
  file: File;
  outputFormat: string;
  isConverted: boolean;
};

const ConverterDropzone = () => {
  const [files, setFiles] = useState<FileState[]>([]);

  const handleFilesAccepted = (files: File[]) => {
    setFiles(
      files.map((file) => ({ file, outputFormat: "", isConverted: false }))
    );
  };

  return (
    <div className="w-full  mx-auto" draggable>
      {files.length > 0 ? (
        <UploadedFileList setFiles={setFiles} files={files} />
      ) : (
        <FileDropzone
          onFilesSelected={handleFilesAccepted}
          maxFiles={10}
          maxSize={52428800} // 50MB
          accept={{
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            "video/*": [".mp4", ".mov", ".avi"],
            "application/pdf": [".pdf"],
          }}
        />
      )}
    </div>
  );
};

export default ConverterDropzone;
