import MyButton from "./myButton";
import { Dispatch, SetStateAction } from "react";
import removeColors from "@/lib/removeColors";
import { ResetIcon } from "./icons/icons";
import { Exam } from "@/interfaces/questionInterface";

export default function Result({
  exam,
  mark,
  setIsSubmit,
  time,
  setAnsweredQuestions,
}: {
  exam: Exam;
  mark: number;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  time: string;
  setAnsweredQuestions: Dispatch<SetStateAction<Set<string>>>;
}) {
  const handleOnClickReview = () => {
    window.scrollTo({ top: 0 });
  };

  const handleOnClickTryAgain = () => {
    const answers = document.querySelectorAll(".answer");
    answers.forEach((answer) => {
      removeColors(answer as HTMLElement);
    });

    const indexNumbers = document.querySelectorAll(".index-number");
    indexNumbers.forEach((indexNumber) => {
      removeColors(indexNumber as HTMLElement);
    });

    setIsSubmit(false);
    setAnsweredQuestions(new Set());
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex flex-col gap-24 mt-20 pb-10 h-[100vh] justify-center text-white">
      <h2 id="mark" className="text-5xl border-b-2 p-5">
        Results
      </h2>
      <section className="text-3xl flex flex-col gap-10 border-l-2 pl-5">
        <p>Final Mark: {(mark / Object.keys(exam).length) * 10} / 10</p>
        <p>Corrects: {mark}</p>
        <p>Incorrects: {Object.keys(exam).length - mark}</p>
        <p>Time: {time}</p>
      </section>
      <section className="flex flex-col md:flex-row gap-10 text-center">
        <MyButton handleOnClick={handleOnClickReview}>Review Answers</MyButton>
        <p className="text-2xl">or</p>
        <MyButton handleOnClick={handleOnClickTryAgain}>Try Again</MyButton>
      </section>
      <a
        href="/"
        className="flex flex-col items-center text-2xl transition hover:scale-125 duration-200 w-fit self-center col-start-2"
      >
        <ResetIcon></ResetIcon>
        <p>New test</p>
      </a>
    </div>
  );
}
