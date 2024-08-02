"use client";
import MyButton from "@/components/myButton";
import { FileLoader } from "@/components/ui/fileLoader";
import { Input } from "@/components/ui/input";
import { extractText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { makeTest, generateTestWithOpenAI } from "../lib/perplexity_utils";
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
      const test = await generateTestWithOpenAI(key, extractedText);
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
    <div className="flex flex-col flex-grow align-center">
      <div className="flex-grow flex flex-col gap-20 justify-center items-center p-10">
        <form
          className="flex flex-col gap-10 items-center w-full max-w-lg"
          onSubmit={handleOnSubmit}
        >
          <section className="flex gap-2 w-full">
            <Input
              required
              type="password"
              placeholder="Write your API key..."
              className="w-[70%]"
              onChange={handleInPutChange}
              value={key}
            />

            <select className="w-[30%] rounded-md">
              <option>gpt-4-turbo</option>
            </select>
          </section>
          <FileLoader onChange={handleFileChange} fileName={fileName} />
          <MyButton>Go to exam!</MyButton>
        </form>
      </div>
      <a
        href="/about"
        className="flex justify-center text-white text-center mb-4 hover:underline"
      >
        Made with 🤍 by Lucian, Sergio and Fernando
      </a>
    </div>
  );
}
