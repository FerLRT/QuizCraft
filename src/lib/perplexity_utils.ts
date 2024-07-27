import { createOpenAI } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";

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

export async function makeTest(key: string, text: string) {
    const perplexity = createOpenAI({
        apiKey: key,
        baseURL: "https://api.perplexity.ai",
    });

    console.log("Making the test...");
    const { object } = await generateObject({
        model: perplexity("llama-3-sonar-large-32k-online"),
        prompt: "Tell me a jocke", //+ "Dado que en este libro se trata el desarrollo de una aplicación web usando las tecnologías del   stack   o pila MERN, conviene describir cada una de estas, conforme a dicho acrónimo. MERN es una combinación de las siguientes cuatro tecnologías:   M ongoDB,  E xpress.js,   R eact.js y   N ode.js, de ahí sus iniciales. La unión de estas tecnologías (junto con otras librerías de soporte) permite desarrollar aplicaciones web   full-stack  usando JavaScript como lenguaje de base, tanto en el cliente como en el servidor.",
        schema: z.object({
            setup : z.string().describe("the setup of the joke"),
            punchline: z.string().describe("the punchline of the joke"),
        }),
        maxTokens: 1000,
        temperature: 0.75,
    });

    console.log("This is the content of the response \n" + object);
    return object;
}