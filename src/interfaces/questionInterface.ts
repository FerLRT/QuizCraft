export interface Exam {
  name?: string;
  questions: {
    [key: string]: Question;
  };
}

export interface Question {
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

export interface ExamsDictionary {
  [key: string]: Exam;
}
