import React, { useState, useCallback, useRef } from "react";
import { Upload, File, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  acceptedTypes?: string[];
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  acceptedTypes = [".pdf", ".docx"],
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Please upload a ${acceptedTypes.join(" or ")} file`);
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return false;
    }

    setError("");
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file && validateFile(file)) {
        onFileUpload(file);
      }
    },
    [onFileUpload, acceptedTypes],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onFileUpload(file);
      }
    },
    [onFileUpload],
  );

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-slate-300 hover:border-slate-400"
          }`}
        onClick={() => fileInputRef.current?.click()} // ✅ click anywhere
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4 pointer-events-none">
          <div className="p-3 bg-slate-100 rounded-full">
            <Upload className="w-8 h-8 text-slate-600" />
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-1">
              Drop your contract here
            </h3>
            <p className="text-slate-600 text-sm">or click to browse files</p>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Extra button still works */}
          <Button
            variant="outline"
            icon={File}
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering parent onClick twice
              fileInputRef.current?.click();
            }}
          >
            Choose File
          </Button>

          <p className="text-xs text-slate-500">
            Supports {acceptedTypes.join(", ")} files up to 10MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};
