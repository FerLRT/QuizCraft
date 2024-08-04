import { Exam } from "@/interfaces/questionInterface";
import { useExam } from "@/context/ExamContext";

export default function Questions({
  results,
  isSubmit,
  setAnsweredQuestions,
}: {
  results: string[];
  isSubmit: boolean;
  setAnsweredQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const { exam } = useExam();
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

  if (!exam) return null;

  return (
    <>
      {Object.keys(exam.questions).map((key) => {
        return (
          <div key={key}>
            <h2
              className="text-white text-2xl font-bold mb-10 w-[100%] max-w-[650px]"
              id={`question${key}`}
            >
              {key}. {exam.questions[key].question}
            </h2>
            <div
              className="text-white flex flex-col gap-10 justify-center items-center"
              data-question={key}
            >
              {exam.questions[key].answers.map((answer) => {
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
            {isSubmit && (
              <p className="text-white mt-10 flex items-center justify-center">
                <span className="text-xl bg-white text-neutral-800 p-1 mr-3 rounded-full w-8 h-8 flex items-center justify-center">
                  &#8505;
                </span>
                {exam.questions[key].explanation}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}
