export interface Exam {
  [key: string]: Question;
}

export interface Question {
  question: string;
  answers: string[];
  correct: number;
}
