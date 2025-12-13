"use client";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { useState } from "react";
import UploadedFileList from "./UploadedFileList";

const ConverterDropzone = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAccepted = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  return (
    <div className="w-full  mx-auto">
      {files.length > 0 ? (
        <UploadedFileList files={files} />
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
