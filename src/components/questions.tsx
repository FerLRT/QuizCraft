import { Exam } from "@/interfaces/questionInterface";

export default function Questions({
  exam,
  results,
  isSubmit,
  setAnsweredQuestions,
}: {
  exam: Exam;
  results: string[];
  isSubmit: boolean;
  setAnsweredQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  let answerCont = 0;

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const parent = target.parentNode as HTMLElement & { dataQuestion?: string };

    const active = document.querySelector(
      `[data-question='${parent?.dataset.question}'] .active`
    ) as HTMLElement | null;

    if (target.classList.contains("active")) {
      target.classList.remove("active");

      // Check if any answers remain active for the question
      const hasActiveAnswers = parent.querySelector(".active");
      if (!hasActiveAnswers) {
        setAnsweredQuestions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(parent.dataset.question!);
          return newSet;
        });
      }
    } else {
      if (active) {
        active.classList.remove("active");
      }
      target.classList.add("active");
      setAnsweredQuestions((prev) =>
        new Set(prev).add(parent.dataset.question!)
      );
    }
  };

  return (
    <>
      {Object.keys(exam).map((key) => {
        return (
          <div key={key}>
            <h2
              className="text-white text-2xl font-bold mb-10 w-[100%] max-w-[650px]"
              id={`question${key}`}
            >
              {key}. {exam[key].question}
            </h2>
            <div
              className="text-white flex flex-col gap-10 justify-center items-center"
              data-question={key}
            >
              {exam[key].answers.map((answer) => {
                return (
                  <p
                    key={answer}
                    className={`answer p-5 bg-neutral-950 w-[100%] max-w-96 transition border-[3px] border-neutral-950 rounded-md  ${
                      isSubmit
                        ? results[answerCont++]
                        : "cursor-pointer hover:scale-110"
                    }`}
                    onClick={!isSubmit ? handleOnClick : undefined}
                  >
                    {answer}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
