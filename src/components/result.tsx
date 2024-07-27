import { EXAMPLE } from "@/lib/constants";
import MyButton from "./myButton";
import { Dispatch, SetStateAction } from "react";
import removeColors from "@/lib/removeColors";

export default function Result({
  mark,
  setIsSubmit,
  time,
}: {
  mark: number;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  time: string;
}) {
  const handleOnClick = () => {
    const answers = document.querySelectorAll(".answer");
    answers.forEach((answer) => {
      removeColors(answer as HTMLElement);
    });

    const indexNumbers = document.querySelectorAll(".index-number");
    indexNumbers.forEach((indexNumber) => {
      removeColors(indexNumber as HTMLElement);
    });

    setIsSubmit(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex flex-col gap-12 mt-10">
      <h2 className="text-white text-3xl">
        Final Mark: {mark + " / " + Object.keys(EXAMPLE).length}
      </h2>
      <p className="text-white text-2xl">Time Elapsed: {time}</p>
      <MyButton handleOnClick={handleOnClick}>Try Again!</MyButton>
    </div>
  );
}
