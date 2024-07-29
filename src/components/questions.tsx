import { Exam } from "@/interfaces/questionInterface";

export default function Questions({
  exam,
  results,
  isSubmit,
}: {
  exam: Exam;
  results: string[];
  isSubmit: boolean;
}) {
  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const parent = target.parentNode as HTMLElement & {
      dataQuestion?: string;
    };

    const active = document.querySelector(
      `[data-question='${parent?.dataset.question}'] .active`
    ) as HTMLElement | null;

    if (target.classList.contains("active")) {
      target.classList.remove("active");
    } else {
      if (active) {
        active.classList.remove("active");
      }
      target.classList.add("active");
    }
  };
  let answerCont = 0;

  return (
    <>
      {Object.keys(exam).map((key) => {
        return (
          <div key={key}>
            <h2 className="text-white text-2xl font-bold" id={`question${key}`}>
              {exam[key].question}
            </h2>
            <div
              className="text-white flex flex-col gap-10"
              data-question={key}
            >
              {exam[key].answers.map((answer, index) => {
                return (
                  <p
                    key={answer}
                    className={`answer p-5 bg-neutral-950 w-96 transition border-2 border-neutral-950 rounded-md  ${
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
