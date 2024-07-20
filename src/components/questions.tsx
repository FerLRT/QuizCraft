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

export default function Questions() {
  const pClass =
    "p-5 bg-neutral-950 w-96 cursor-pointer transition hover:scale-110 border-2 border-neutral-950";

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
      {Object.keys(example).map((item) => {
        return (
          <>
            <h2 className="text-white text-2xl font-bold">
              {example[item].question}
            </h2>
            <div
              className="text-white flex flex-col gap-10"
              data-question={item}
            >
              {example[item].answers.map((answer) => {
                return (
                  <p key={answer} className={pClass} onClick={handleOnCLick}>
                    {answer}
                  </p>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}
