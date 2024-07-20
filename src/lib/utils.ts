import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function extractTextFromTXT(file: File): Promise<string> {
  // TODO: Implement TXT text extraction

  return "txt";
}

export async function extractTextFromWord(file: File): Promise<string> {
  // TODO: Implement Word text extraction

  return "word";
}

export async function extractTextFromPDF(file: File): Promise<string> {
  // TODO: Implement PDF text extraction

  return "pdf";
}

export function getFileExtension(file: File): string | undefined {
  return file.name.split(".").pop()?.toLowerCase();
}

export async function extractText(file: File): Promise<string> {
  const ext = getFileExtension(file);

  if (ext === "pdf") {
    return await extractTextFromPDF(file);
  } else if (ext === "docx") {
    return await extractTextFromWord(file);
  } else if (ext === "txt") {
    return await extractTextFromTXT(file);
  } else {
    throw new Error("Unsupported file type");
  }
}
