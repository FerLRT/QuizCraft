import lucianImg from "../components/assets/lucian.jpg";
import sergioImg from "../components/assets/sergio.jpg";
import fernandoImg from "../components/assets/fernando.jpg";

import { Exam } from "@/interfaces/questionInterface";

export const EXAMPLE: Exam = {
  1: {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 1,
  },
  2: {
    question: "Question 2",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 1,
  },
  3: {
    question: "Question 3",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 1,
  },
  4: {
    question: "Question 4",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 1,
  },
  5: {
    question: "Question 5",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 1,
  },
};

export const TEAM_MEMBERS = [
  {
    name: "Lucian Andrei Farcas",
    role: "Computer Engineer",
    description: "Description.",
    imageUrl: lucianImg,
    linkedIn: "https://www.linkedin.com/in/lucian-farcas/",
    github: "https://github.com/Lucian-UCLM",
  },
  {
    name: "Sergio García Muñoz",
    role: "Computer Engineer",
    description: "Description.",
    imageUrl: sergioImg,
    linkedIn: "https://www.linkedin.com/in/sergiogarciiam/",
    github: "https://github.com/sergiogarciiam",
  },
  {
    name: "Fernando Lorente Calvo",
    role: "Computer Engineer",
    description:
      "I am passionate about technology and I am always looking for opportunities to learn and expand my knowledge. My goal is to contribute to innovative projects and continue to grow both professionally and personally, learning from every experience and challenge that comes my way.",
    imageUrl: fernandoImg,
    linkedIn: "https://www.linkedin.com/in/fernando-lorente-09aab0274/",
    github: "https://github.com/FerLRT",
  },
];
