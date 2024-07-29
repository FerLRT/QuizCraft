import { createOpenAI } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";
import { Exam, Question} from "../interfaces/questionInterface";

const testSchema = z.object({
    questions: z.array(
        z.object({
            question: z.string(),
            answers: z.array(z.string()).length(4),
            correct: z.number().min(0).max(3),
        })
    ).length(10),
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

    const testLines = text.split('\n').filter(line => line.trim() !== '');
  const questions: { question: string; answers: string[]; correct: number; }[] = [];

  for (let i = 0; i < testLines.length; i += 6) {
    const questionLine = testLines[i].split('. ')[1];
    const answers = [
      testLines[i + 1].split(') ')[1],
      testLines[i + 2].split(') ')[1],
      testLines[i + 3].split(') ')[1],
      testLines[i + 4].split(') ')[1],
    ];
    const correct = parseInt(testLines[i + 5].split(': ')[1], 10);
    questions.push({ question: questionLine, answers, correct });
  }

  const test = { questions };

  try {
    testSchema.parse(test);

    const exam: Exam = {};
    test.questions.forEach((q, index) => {
      exam[`Question ${index + 1}`] = q;
    });

    console.log('Exam is valid:', exam);
    return exam;
  } catch (e) {
    console.error('Test is invalid:', (e as Error).message);
    return null;
  }
}