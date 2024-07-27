"use client";
import Index from "@/components";
import Questions from "@/components/questions";
import Result from "@/components/result";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import getMark from "@/lib/getMark";

export default function Exam() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [results, setResults] = useState([]);
  const [mark, setMark] = useState(0);

  const handleOnCLick = () => {
    setIsSubmit(true);
    setMark(getMark(setResults));
  };

  return (
    <>
      <Index></Index>

      <div className="flex flex-col gap-20 items-center mt-20">
        <Questions results={results} isSubmit={isSubmit}></Questions>
        {isSubmit ? (
          <Result mark={mark}></Result>
        ) : (
          <Button
            onClick={handleOnCLick}
            className="hover:scale-125 hover:bg-neutral-950 hover:border-neutral-950 transition duration-200 bg-neutral-900 text-2xl border border-white mb-20"
          >
            Submit Answers!
          </Button>
        )}
      </div>
    </>
  );
}
