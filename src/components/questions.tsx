import { EXAMPLE } from "@/lib/constants";

export default function Questions({ isSubmit }) {
  const handleOnCLick = (e) => {
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
  return (
    <>
      {Object.keys(EXAMPLE).map((key) => {
        return (
          <>
            <h2 className="text-white text-2xl font-bold" id={`question${key}`}>
              {EXAMPLE[key].question}
            </h2>
            <div
              className="text-white flex flex-col gap-10"
              data-question={key}
            >
              {EXAMPLE[key].answers.map((answer) => {
                return (
                  <p
                    key={answer}
                    className={`p-5 bg-neutral-950 w-96 transition ${"cursor-pointer hover:scale-110"} border-2 border-neutral-950`}
                    onClick={!isSubmit ? handleOnCLick : undefined}
                  >
                    {answer}
                  </p>
                );
              })}
              <p className="hidden">
                The correct answer is:{" "}
                {EXAMPLE[key].answers[EXAMPLE[key].correct]}
              </p>
            </div>
          </>
        );
      })}
    </>
  );
}
