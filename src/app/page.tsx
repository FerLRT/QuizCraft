"use client";
import MyButton from "@/components/myButton";
import { FileLoader } from "@/components/ui/fileLoader";
import { Input } from "@/components/ui/input";
import { extractText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, use, useState } from "react";
import { generateTextWithPerplexity, makeTest} from "../lib/perplexity_utils";


export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [text, setText] = useState<string | null>(null);
  const [key, setKey] = useState<string>("");


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleInPutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  }

  const handleOnSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    let extractedText = "";
    try {
      extractedText = await extractText(file);
      router.push("/exam");
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Error extracting text");
    }
    const test = await makeTest(key, extractedText);
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
        onChange={handleInPutChange}
        value={key}
      ></Input>

      <FileLoader onChange={handleFileChange} fileName={fileName} />

      <MyButton>Go to exam!</MyButton>
    </form>
  );
}
