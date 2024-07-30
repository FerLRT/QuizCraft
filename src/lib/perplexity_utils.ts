import { createOpenAI } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";
import { Exam, Question} from "../interfaces/questionInterface";

const testSchema = z.object({
    questions: z.array(
        z.object({
            question: z.string().describe("The question text, must be clear and concise"),
            answers: z.array(z.string())
                .length(4)
                .describe("The possible answers to the question, must be an array of 4 strings"),
            correct: z.number()
                .min(0)
                .max(3)
                .describe("The index of the correct answer in the answers array, must be between 0 and 3 inclusive"),
        })
    ).length(10).describe("An array of 10 question objects, each containing a question, answers, and the correct answer index"),
});

export async function generateTextWithPerplexity(key: string) {
    console.log(key);
    const perplexity = createOpenAI({
        apiKey: key,
        baseURL: "https://api.perplexity.ai",
    });

    const {text} = await generateText({
        model: perplexity("llama-3-sonar-large-32k-chat"),
        prompt: "Tell me a joke",
        maxTokens: 1000,
        temperature: 0.75,
        frequencyPenalty: 1,
    });

    return text;
};

export async function makeTest(key: string, extractedText: string) {
    const perplexity = createOpenAI({
        apiKey: key,
        baseURL: "https://api.perplexity.ai",
    });

    console.log("Making the test...");

    const { text } = await generateText({
        model: perplexity("llama-3-sonar-large-32k-online"),
        prompt: `Generate me a test about the following content:\n${extractedText}\nin plain text with a maximum of 10 questions and 4 answers per question in the following format: 
        Number. Question
        1) Answer 1
        2) Answer 2
        3) Answer 3
        4) Answer 4
        Correct: 1`,
        maxTokens: 1000,
        temperature: 0.3,
    });
    console.log(text);
    const testLines = text.split('\n').filter(line => line.trim() !== '');
  const questions: { question: string; answers: string[]; correct: number; }[] = [];

  for (let i = 0; i < testLines.length; i += 6) {
    const questionLine = testLines[i].split('. ')[1];
    const answers = [
      testLines[i].split(') ')[1],
      testLines[i].split(') ')[1],
      testLines[i].split(') ')[1],
      testLines[i].split(') ')[1],
    ];
    const correct = parseInt(testLines[i + 5].split(': ')[1], 10)-1;
    questions.push({ question: questionLine, answers, correct });
  }

  const test = { questions };

  try {
    testSchema.parse(test);

    const exam: Exam = {};
    test.questions.forEach((q, index) => {
      exam[`${index + 1}`] = q;
    });

    console.log('Exam is valid:', exam);
    return exam;
  } catch (e) {
    console.error('Test is invalid:', (e as Error).message);
    return null;
  }
}

export async function generateTestWithOpenAI(key: string, extractedText: string) {
  const openai = createOpenAI({
    apiKey: key,
});

console.log("Making the test...");

const prompt = `Generate me a test about the following content:\n${extractedText}\n`;

const response = await generateObject({
    model: openai("gpt-4-turbo"),
    prompt: prompt,
    schema: testSchema,
    maxTokens: 1000,
    temperature: 0.75,
});

console.log("Raw response: "+response);
const test = response.object;
console.log(test);

try {
    testSchema.parse(test);

    const exam: Exam = {};
    test.questions.forEach((q: Question, index: number) => {
        exam[`${index + 1}`] = q;
    });

    console.log('Exam is valid:', exam);
    return exam;
} catch (e) {
    console.error('Test is invalid:', (e as Error).message);
    return null;
}
}