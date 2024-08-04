"use client";

import { useState, useEffect } from "react";
import { Exam, ExamsDictionary } from "../interfaces/questionInterface";

const generateUniqueId = () => `exam_${Date.now()}`;

export function useLocalStorage() {
  const [exams, setExams] = useState<ExamsDictionary>({});

  useEffect(() => {
    const loadExams = () => {
      const storedExams = JSON.parse(
        localStorage.getItem("exams") || "{}"
      ) as ExamsDictionary;
      setExams(storedExams);
    };

    loadExams();
  }, []);

  // Get all exams from the localStorage
  const getExams = () => {
    return exams;
  };

  // Add or update an exam in the localStorage
  const addExam = (exam: Exam) => {
    const examId = generateUniqueId();

    const newExams = {
      ...exams,
      [examId]: exam,
    };

    setExams(newExams);
    localStorage.setItem("exams", JSON.stringify(newExams));
  };

  // Remove an exam by ID from the localStorage
  const deleteExam = (examId: string) => {
    const newExams = { ...exams };
    delete newExams[examId];

    setExams(newExams);
    localStorage.setItem("exams", JSON.stringify(newExams));
  };

  // Clear all exams from localStorage
  const clearExams = () => {
    localStorage.removeItem("exams");
    setExams({});
  };

  return { exams, getExams, addExam, deleteExam, clearExams };
}
