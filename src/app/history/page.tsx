"use client";

import React, { useState } from "react";
import { Exam } from "../../interfaces/questionInterface";
import { useExam } from "@/context/ExamContext";
import { useLocalStorage } from "../../lib/examLocalStorage";
import { useRouter } from "next/navigation";
import { BiTrashFill } from "../../components/icons/icons";
import DeleteAlert from "../../components/deleteAlert";

export default function History() {
  const router = useRouter();
  const { setExam } = useExam();
  const { exams, deleteExam, clearExams } = useLocalStorage();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [examIdToDelete, setExamIdToDelete] = useState<string | null>(null);
  const [examNameToDelete, setExamNameToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setExam(exams[e.currentTarget.id.split("-")[1]]);
    router.push("/exam");
  };

  const handleDeleteExam = (examId: string, examName: string) => {
    setExamNameToDelete(examName);
    setExamIdToDelete(examId);
    setIsShowConfirm(true);
  };

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (examIdToDelete === "all") {
      clearExams();
    } else if (examIdToDelete) {
      deleteExam(examIdToDelete);
    }
    setIsShowConfirm(false);
    setExamIdToDelete(null);
  };

  const cancelDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShowConfirm(false);
    setExamIdToDelete(null);
  };

  const filteredExams = Object.keys(exams).filter((examId) => {
    const exam = exams[examId] as Exam;
    return (
      exam.name && exam.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="text-white p-8 md:w-10/12 lg:w-8/12 self-center flex flex-col gap-10 flex-grow relative">
      <h1 className="text-4xl font-bold text-center">History</h1>
      <input
        type="text"
        placeholder="Search exams..."
        className="flex self-center p-2 mb-4 w-full max-w-md rounded-md text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 items-center flex-grow">
        {Object.keys(exams).length === 0 ? (
          <p className="text-2xl font-bold">
            You currently have no saved tests
          </p>
        ) : (
          Object.keys(exams).map((examId) => {
            const exam = exams[examId] as Exam;
            return (
              <div
                id={`exam-${examId}`}
                key={examId}
                onClick={handleOnClick}
                className="flex w-full gap-5 items-center bg-neutral-950 p-5 rounded-lg cursor-pointer hover:scale-110 transition duration-200"
              >
                <h2 className="text-2xl font-bold">{exam.name}</h2>
                <button
                  className="bg-red-500 hover:bg-red-700 p-2 rounded-lg ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteExam(examId, exam.name || "this exam");
                  }}
                >
                  <BiTrashFill className="w-7 h-7" />
                </button>
              </div>
            );
          })
        )}
      </div>
      {isShowConfirm && (
        <DeleteAlert
          examName={examNameToDelete || "this exam"}
          isShowConfirm={isShowConfirm}
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        >
          <></>
        </DeleteAlert>
      )}
    </div>
  );
}
