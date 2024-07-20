import { Button } from "@/components/ui/button";

const example = {
  1: {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
  2: {
    question: "Question 2",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
  3: {
    question: "Question 3",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
  4: {
    question: "Question 4",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
  5: {
    question: "Question 5",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
};

export default function Exam() {
  const pClass =
    "p-5 bg-neutral-950 w-96 cursor-pointer transition hover:scale-110";
  return (
    <div className="flex flex-col gap-20 items-center mt-20">
      {Object.keys(example).map((item) => {
        return (
          <>
            <h2 className="text-white size text-2xl font-bold">
              {example[item].question}
            </h2>
            <div className="text-white flex flex-col gap-10">
              {example[item].answers.map((answer) => {
                return (
                  <p key={answer} className={pClass}>
                    {answer}
                  </p>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
