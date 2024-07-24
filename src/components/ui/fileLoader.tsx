"use client";

import { FileInput, Label } from "flowbite-react";
import { useState } from "react";

export function FileLoader({
  onChange,
  fileName,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);

  const validFileTypes = [
    "text/plain", // .txt
    "application/pdf", // .pdf
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "text/markdown", // .md
    "application/vnd.oasis.opendocument.text", // .odt
  ];
  const validExtensions = ["txt", "pdf", "docx", "md", "odt"];

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);

      // Check if file type is valid
      const fileType = e.dataTransfer.items[0]?.type || "";
      setInvalidFileType(!!fileType && !validFileTypes.includes(fileType));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (file) {
        // Check file extension as well
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (
          validFileTypes.includes(file.type) ||
          validExtensions.includes(fileExtension || "")
        ) {
          const event = {
            target: { files: e.dataTransfer.files },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
          setInvalidFileType(false);
        } else {
          setInvalidFileType(true);
        }
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setInvalidFileType(false);
  };

  return (
    <div
      className={`flex w-[90%] items-center justify-center border-2 rounded-lg ${
        dragActive
          ? invalidFileType
            ? "border-red-600 bg-red-50"
            : "border-blue-900 bg-blue-50"
          : "border-gray-300 bg-gray-50"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PDF, TXT, DOCX, MD or ODT files only (max 5MB)
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {fileName ? (
              <>
                <span className="font-semibold">File:</span> {fileName}
              </>
            ) : (
              "Add a file"
            )}
          </p>
        </div>
        <FileInput
          id="dropzone-file"
          className="hidden"
          onChange={onChange}
          accept=".pdf, .txt, .docx, .md, .odt"
        />
      </Label>
    </div>
  );
}
