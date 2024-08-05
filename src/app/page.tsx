"use client";

import MyButton from "@/components/myButton";
import { FileLoader } from "@/components/ui/fileLoader";
import { Input } from "@/components/ui/input";
import { extractText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { generateTest } from "../lib/ia_utils";
import { useExam } from "@/context/ExamContext";
import { Loader } from "../components/assets/loader";
import { useLocalStorage } from "../lib/examLocalStorage";
import AlertMessage from "@/components/alertMessage";

export default function Home() {
  const router = useRouter();
  const { setExam } = useExam();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [key, setKey] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4-turbo");
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [error, setError] = useState<string | null>("");
  const [message, setMessage] = useState<string | null>("");

  const { addExam } = useLocalStorage();

  useEffect(() => {
    const key = localStorage.getItem("key");

    if (key) {
      setKey(key);
    }
  }, []);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).length;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleInPutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  const handleOnSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!file) {
      setError("Error");
      setMessage("Please add a file");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setShowAlert(false);
    try {
      const extractedText = await extractText(file);
      const wordCount = countWords(extractedText);

      if (wordCount > 3000) {
        setError("Error");
        setMessage(
          "The text is too long, please use a text with less than 3000 words"
        );
        setShowAlert(true);
        return;
      }

      const test = await generateTest(key, extractedText, selectedModel);
      if (test) {
        setExam(test);
        addExam(test);
        router.push("/exam");
      } else {
        setError("Error");
        setMessage("Failed to generate test");
        setShowAlert(true);
      }
    } catch (error) {
      setError("Error");
      setMessage(
        "Something went wrong. Be sure to enter a valid API KEY and try again."
      );
      setShowAlert(true);
    } finally {
      setLoading(false);
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

            <select
              className="w-[30%] rounded-md cursor-pointer"
              onChange={handleOptionChange}
              value={selectedModel}
            >
              <option value="gpt-4-turbo">gpt-4-turbo</option>
            </select>
          </section>
          <FileLoader onChange={handleFileChange} fileName={fileName} />

          <div className="w-48 h-24 flex items-center justify-center">
            {loading ? (
              <section className="flex flex-col gap-2 items-center">
                <Loader className="w-8 h-8" />
                <span className="text-white text-center mt-2">
                  Wait while the test is generated...
                </span>
              </section>
            ) : (
              <section className="flex flex-col gap-5 items-center">
                <MyButton>Go to exam!</MyButton>
                <a
                  href="/history"
                  className="text-white font-bold cursor-pointer mt-5 hover:underline"
                >
                  History
                </a>
              </section>
            )}
          </div>
        </form>
      </div>

      {showAlert && (
        <div className="fixed top-0 left-0 right-0 p-4 z-50">
          <AlertMessage
            type={error || ""}
            message={message || ""}
            onClose={() => setShowAlert(false)}
            duration={5000}
          />
        </div>
      )}

      <a
        href="/about"
        className="flex justify-center text-white text-center mb-4 hover:underline"
      >
        Made with 🤍 by Lucian, Sergio and Fernando
      </a>
    </div>
  );
}
