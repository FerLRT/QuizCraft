"use client";
import Index from "@/components";
import Questions from "@/components/questions";
import Result from "@/components/result";
import MyButton from "@/components/myButton";
import { useState, useEffect, useRef } from "react";
import getMark from "@/lib/getMark";
import formatTime from "@/lib/formatTime";
import { useExam } from '@/context/ExamContext';

export default function Exam() {
  const { exam } = useExam();
  const [isSubmit, setIsSubmit] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [mark, setMark] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    if (!exam) {
      // Handle case where exam data is not available
      console.error("No exam data found");
      return;
    }
    // Init the timer when the page loads
    timerRef.current = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    // Stop the timer when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current as NodeJS.Timeout);
      }
    };
  }, [exam]);

  const handleOnClick = () => {
    setIsSubmit(true);
    setMark(getMark(setResults));

    clearInterval(timerRef.current!);
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Index></Index>

      <div className="flex flex-col gap-20 items-center mt-20">
        <Questions exam={exam} results={results} isSubmit={isSubmit}></Questions>
        {isSubmit ? (
          <Result
            mark={mark}
            setIsSubmit={setIsSubmit}
            time={formatTime(timeElapsed)}
          ></Result>
        ) : (
          <MyButton handleOnClick={handleOnClick}>Submit Answers!</MyButton>
        )}
      </div>
    </>
  );
}
