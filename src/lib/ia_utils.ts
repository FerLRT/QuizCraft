import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { Exam, Question} from "../interfaces/questionInterface";

const testSchema = z.object({
  questions: z.array(
      z.object({
          question: z.string().describe("The question text, must be clear and end with a question mark"),
          answers: z.array(z.string())
              .length(4)
              .describe("The possible answers to the question, must be an array of 4 strings"),
          correct: z.number()
              .min(0)
              .max(3)
              .describe("The index of the correct answer in the answers array, must be between 0 and 3 inclusive"),
          explanation: z.string().describe("A detailed explanation of the correct answer")
      })
  ).length(10).describe("An array of 10 question objects, each containing a question, answers, the correct answer index, and an explanation"),
});

function modelElection(model: string) {
    const election =  {
        "gpt-4-turbo": {model: "gpt-4-turbo", url:"https://api.openai.com/v1"},
        "gemma2-9b-it": {model: "gemma2-9b-it", url: "https://api.groq.com/openai/v1"}
};
    return election[model as keyof typeof election];
}

async function validateTest(test: any) {
    try {
        testSchema.parse(test);
  
        const exam: Exam = {};
        test.questions.forEach((q: Question, index: number) => {
            exam[`${index + 1}`] = q;
        });
  
        console.log('Exam is valid:');
        return exam;
    } catch (e) {
        console.error('Test is invalid:', (e as Error).message);
        return null;
    }
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function generateTest(key: string, extractedText: string, modelOption: string) {
    const model = modelElection(modelOption);
    const openai = createOpenAI({
        apiKey: key,
        baseUrl: model.url,
    });

    const prompt = `Generate me a test about the following content: ${extractedText}`;

    const response = await generateObject({
        model: openai(model.model),
        prompt: prompt,
        schema: testSchema,
        maxTokens: 1000,
        temperature: 0.3,
    });

    const test = response.object;

    test.questions.forEach((q: any) => {
        const correctAnswer = q.answers[q.correct];
        q.answers = shuffleArray(q.answers);
        q.correct = q.answers.indexOf(correctAnswer);
    });

    return await validateTest(test);

}