import { Exam } from "@/interfaces/questionInterface";

export default function getMark(setResults: any, exam: Exam): number {
  let mark = 0;
  let results: string[] = [];

  Object.keys(exam.questions).forEach((key) => {
    const answers = document.querySelectorAll(
      `[data-question='${key}'] .answer`
    );
    const questionIndex = document.querySelector(`[data-index='${key}']`);

    answers.forEach((answer) => {
      const index = exam.questions[key].answers.indexOf(
        answer.textContent || ""
      );
      if (answer.classList.contains("active")) {
        if (index === exam.questions[key].correct) {
          mark += 1;
          questionIndex?.classList.add("correct");
          results.push("correct");
        } else {
          questionIndex?.classList.add("incorrect");
          results.push("incorrect");
        }
      } else {
        index === exam.questions[key].correct
          ? results.push("unchecked")
          : results.push("");
      }
    });
  });

  setResults(results);
  return mark;
}
