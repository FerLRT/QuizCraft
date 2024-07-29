"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Exam } from '@/interfaces/questionInterface';

interface ExamContextType {
  exam: Exam | null;
  setExam: (exam: Exam) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider = ({ children }: { children: ReactNode }) => {
  const [exam, setExam] = useState<Exam | null>(null);

  return (
    <ExamContext.Provider value={{ exam, setExam }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
