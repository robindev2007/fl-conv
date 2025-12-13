"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, FileCheck, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { P } from "./typography";

interface FileDropzoneProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  className?: string;
}

export const FileDropzone = ({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10485760, // 10MB default
  accept,
  className,
}: FileDropzoneProps) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        const errorCode = rejection.errors[0]?.code;

        if (errorCode === "file-too-large") {
          setError(`File too large. Max ${(maxSize / 1048576).toFixed(0)}MB`);
        } else if (errorCode === "file-invalid-type") {
          setError("Invalid file type");
        } else if (errorCode === "too-many-files") {
          setError(`Max ${maxFiles} files allowed`);
        } else {
          setError("Upload failed");
        }
        setTimeout(() => setError(null), 4000);
        return;
      }

      if (acceptedFiles.length > 0) {
        setSelectedFiles(acceptedFiles);
        onFilesSelected?.(acceptedFiles);
      }
    },
    [maxSize, maxFiles, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles,
      maxSize,
      accept,
    });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative flex flex-col items-center justify-center w-full min-h-[240px] px-6 py-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
        error && "border-destructive bg-destructive/5",
        !error &&
          isDragActive &&
          !isDragReject &&
          "border-primary bg-primary/5",
        !error && isDragReject && "border-destructive bg-destructive/5",
        !error &&
          !isDragActive &&
          "border-border hover:border-primary/50 hover:bg-accent/50",
        selectedFiles.length > 0 &&
          !error &&
          !isDragActive &&
          "border-success/50 bg-success/5",
        className
      )}>
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center space-y-3">
        {error ? (
          <AlertCircle className="w-10 h-10 text-destructive" />
        ) : selectedFiles.length > 0 ? (
          <FileCheck className="w-10 h-10 text-success" />
        ) : (
          <Upload
            className={cn(
              "w-10 h-10 transition-colors",
              isDragActive
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            )}
          />
        )}

        <div className="text-center space-y-1">
          {error ? (
            <>
              <P className="text-base font-medium text-destructive">Error</P>
              <P className="text-sm text-destructive/80">{error}</P>
            </>
          ) : selectedFiles.length > 0 ? (
            <>
              <P className="text-base font-medium text-success">
                {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""}{" "}
                selected
              </P>
              <P className="text-xs text-muted-foreground">
                {selectedFiles[0].name}
                {selectedFiles.length > 1 &&
                  ` +${selectedFiles.length - 1} more`}
              </P>
            </>
          ) : isDragActive ? (
            <P className="text-base font-medium text-primary">
              Drop files here
            </P>
          ) : (
            <>
              <P className="text-base font-medium text-foreground">
                Drag & drop files here
              </P>
              <P className="text-sm text-muted-foreground">
                or{" "}
                <span className="text-primary font-medium">
                  click to browse
                </span>
              </P>
              <P className="text-xs text-muted-foreground/70 pt-2">
                Max {maxFiles} file(s) • Up to {(maxSize / 1048576).toFixed(0)}
                MB each
              </P>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
