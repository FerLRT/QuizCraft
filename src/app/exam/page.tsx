"use client";
import Index from "@/components";
import Questions from "@/components/questions";
import Result from "@/components/result";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Exam() {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <>
      <Index></Index>

      <div className="flex flex-col gap-20 items-center mt-20">
        <Questions></Questions>
        {isSubmit ? (
          <Result></Result>
        ) : (
          <Button
            onClick={() => setIsSubmit(true)}
            className="hover:scale-125 hover:bg-neutral-950 hover:border-neutral-950 transition duration-200 bg-neutral-900 text-2xl border border-white mb-20"
          >
            Submit Answers!
          </Button>
        )}
      </div>
    </>
  );
}
