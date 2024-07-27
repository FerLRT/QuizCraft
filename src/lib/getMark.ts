import { EXAMPLE } from "./constants";

export default function getMark(setResults): number {
  let mark = 0;
  let results = [];

  Object.keys(EXAMPLE).forEach((key) => {
    const answers = document.querySelectorAll(
      `[data-question='${key}'] .answer`
    );
    const questionIndex = document.querySelector(`[data-index='${key}']`);

    answers.forEach((answer) => {
      const index = EXAMPLE[key].answers.indexOf(answer.textContent);
      if (answer.classList.contains("active")) {
        if (index === EXAMPLE[key].correct) {
          mark += 1;
          questionIndex?.classList.add("correct");
          results.push("correct");
        } else {
          questionIndex?.classList.add("incorrect");
          results.push("incorrect");
        }
      } else {
        index === EXAMPLE[key].correct
          ? results.push("unchecked")
          : results.push("");
      }
    });
  });

  setResults(results);
  return mark;
}
