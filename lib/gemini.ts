import { GoogleGenAI } from "@google/genai";

import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const prompt = `
    ${SUMMARY_SYSTEM_PROMPT}\n\n
    Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:
    ${pdfText}
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    if (!response.text) {
      throw new Error("No response from gemini");
    }

    return response.text;
  } catch (error: any) {
    console.error("Error generating summary from gemini", error);
    throw new Error("Error generating summary from gemini");
  }
};
