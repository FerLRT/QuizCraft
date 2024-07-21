import { EXAMPLE } from "@/lib/constants";

export default function Result() {
  return <h2 className="text-white mb-20 text-2xl">Result: {getResult()}</h2>;
}

function getResult() {
  let result = 0;
  Object.keys(EXAMPLE).forEach((key) => {
    const answer = document.querySelector(`[data-question='${key}'] .active`);
    if (answer) {
      const index = EXAMPLE[key].answers.indexOf(answer.textContent);
      if (index === EXAMPLE[key].correct) {
        result += 1;
        answer.classList.add("correct");
      } else {
        answer.classList.add("incorrect");
      }
    }
  });
  return result;
}
