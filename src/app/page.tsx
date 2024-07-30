"use client";
import MyButton from "@/components/myButton";
import { FileLoader } from "@/components/ui/fileLoader";
import { Input } from "@/components/ui/input";
import { extractText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { makeTest } from "../lib/perplexity_utils";
import { useExam } from "@/context/ExamContext";

export default function Home() {
  const router = useRouter();
  const { setExam } = useExam();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [key, setKey] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleInPutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

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
      const test = await makeTest(key, extractedText);
      if (test) {
        setExam(test);
        router.push("/exam");
      } else {
        alert("Failed to generate test");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Error extracting text");
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-20 items-center mt-40"
        onSubmit={handleOnSubmit}
      >
        <Input
          required
          type="password"
          placeholder="Write your API key..."
          className="w-[50%]"
          onChange={handleInPutChange}
          value={key}
        ></Input>

        <FileLoader onChange={handleFileChange} fileName={fileName} />

        <MyButton>Go to exam!</MyButton>
      </form>
      <a
        href="/about"
        className="text-white self-center mt-auto mb-10 hover:underline"
      >
        Made with 🤍 by Lucian, Sergio and Fernando
      </a>
    </>
  );
}
