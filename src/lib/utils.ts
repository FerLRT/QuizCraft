import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mammoth from "mammoth";
import pdfToText from "react-pdftotext";
import JSZip from "jszip";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function extractTextFromTXT(file: File): Promise<string> {
  const text = await file.text();
  return text;
}

export async function extractTextFromWord(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const text = await pdfToText(file);
  return text;
}

export async function extractTextFromMarkdown(file: File): Promise<string> {
  const text = await file.text();
  return text;
}

export async function extractTextFromODT(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const contentXml = await zip.file("content.xml")?.async("string");

  if (!contentXml) {
    throw new Error(
      "No se pudo encontrar el archivo content.xml en el archivo ODT."
    );
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(contentXml, "application/xml");
  const paragraphs = xmlDoc.getElementsByTagName("text:p");

  let text = "";
  for (let i = 0; i < paragraphs.length; i++) {
    text += paragraphs[i].textContent + "\n";
  }

  return text.trim();
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
  } else if (ext === "md") {
    return await extractTextFromMarkdown(file);
  } else if (ext === "odt") {
    return await extractTextFromODT(file);
  } else {
    throw new Error("Unsupported file type");
  }
}
