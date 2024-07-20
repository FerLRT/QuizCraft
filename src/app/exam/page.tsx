"use client";
import Questions from "@/components/questions";
import Result from "@/components/result";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Exam() {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <div className="flex flex-col gap-20 items-center mt-20">
      <Questions></Questions>
      {isSubmit ? (
        <Result></Result>
      ) : (
        <Button
          onClick={() => setIsSubmit(true)}
          className="hover:scale-125 transition duration-200 bg-neutral-950 mb-10"
        >
          Submit Answers!
        </Button>
      )}
    </div>
  );
}
