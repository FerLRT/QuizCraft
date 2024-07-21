"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleOnSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    try {
      const extractedText = await extractText(file);
      console.log("Extracted Text:", extractedText);
      router.push("/exam");
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Error extracting text");
    }
  };

  return (
    <form
      className="flex flex-col gap-20 items-center mt-40"
      onSubmit={handleOnSubmit}
    >
      <Input
        required
        type="password"
        placeholder="Write your API key..."
        className="w-fit"
      ></Input>
      <Input
        required
        type="file"
        accept=".txt, .docx, .pdf, .md, .odt"
        className="w-fit"
        onChange={handleFileChange}
      ></Input>
      <Button className="hover:scale-125 hover:bg-neutral-950 hover:border-neutral-950 transition duration-200 bg-neutral-900 text-2xl border border-white">
        Go to exam!
      </Button>
    </form>
  );
}
