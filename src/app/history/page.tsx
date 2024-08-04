"use client";

import React from "react";
import { Exam } from "../../interfaces/questionInterface";
import { useExam } from "@/context/ExamContext";
import { useLocalStorage } from "../../lib/examLocalStorage";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();
  const { setExam } = useExam();
  const { exams, deleteExam, clearExams } = useLocalStorage();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setExam(exams[e.currentTarget.id.split("-")[1]]);
    router.push("/exam");
  };

  return (
    <div className="text-white p-8 md:w-10/12 lg:w-8/12 self-center flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center">History</h1>
      <div className="flex flex-col gap-10 items-center">
        {Object.keys(exams).map((examId) => {
          const exam = exams[examId] as Exam;
          return (
            <div
              id={`exam-${examId}`}
              key={examId}
              onClick={handleOnClick}
              className="flex flex-col gap-5 items-center bg-gray-800 p-5 rounded-lg hover:scale-110 pointer"
            >
              <h2 className="text-2xl font-bold">{exam.name}</h2>
              <button
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
                onClick={() => deleteExam(examId)}
              >
                Delete
              </button>
            </div>
          );
        })}
        <button
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
          onClick={clearExams}
        >
          Clear History
        </button>
      </div>
    </div>
  );
}
