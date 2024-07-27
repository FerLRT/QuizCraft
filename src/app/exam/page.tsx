"use client";
import Index from "@/components";
import Questions from "@/components/questions";
import Result from "@/components/result";
import MyButton from "@/components/myButton";
import { useState, useEffect, useRef } from "react";
import getMark from "@/lib/getMark";
import formatTime from "@/lib/formatTime";

export default function Exam() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [results, setResults] = useState([]);
  const [mark, setMark] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
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
  }, []);

  const handleOnClick = () => {
    setIsSubmit(true);
    setMark(getMark(setResults));

    clearInterval(timerRef.current!);
  };

  return (
    <>
      <Index></Index>

      <div className="flex flex-col gap-20 items-center mt-20">
        <Questions results={results} isSubmit={isSubmit}></Questions>
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
