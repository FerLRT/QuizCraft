"use client";
import Index from "@/components";
import Questions from "@/components/questions";
import Result from "@/components/result";
import MyButton from "@/components/myButton";
import { useState, useEffect, useRef } from "react";
import getMark from "@/lib/getMark";
import formatTime from "@/lib/formatTime";
import { useExam } from "@/context/ExamContext";
import useMark from "../hooks/useMark";

export default function Exam() {
  const { exam } = useExam();
  const [isSubmit, setIsSubmit] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [mark, setMark] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );

  useMark(isSubmit, mark);
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
    if (!exam) {
      return;
    }
    setIsSubmit(true);
    setMark(getMark(setResults, exam));
    clearInterval(timerRef.current!);

    const mark = document.getElementById("mark");
    mark?.scrollIntoView({ behavior: "smooth" });
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Index exam={exam} answeredQuestions={answeredQuestions}></Index>
      <div className="flex flex-col gap-20 items-center mt-20 mb-20 mr-[10%] ml-[10%]">
        <Questions
          exam={exam}
          results={results}
          isSubmit={isSubmit}
          setAnsweredQuestions={setAnsweredQuestions}
        ></Questions>
        {isSubmit ? (
          <Result
            exam={exam}
            mark={mark}
            setIsSubmit={setIsSubmit}
            time={formatTime(timeElapsed)}
            setAnsweredQuestions={setAnsweredQuestions}
          ></Result>
        ) : (
          <MyButton handleOnClick={handleOnClick}>Submit Answers!</MyButton>
        )}
      </div>
    </>
  );
}
