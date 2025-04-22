"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
      file: {
        url: string;
        ufsUrl: string;
        name: string;
      };
    };
  }[],
) {
  if (!uploadResponse)
    return {
      success: false,
      message: "Upload failed",
      data: null,
    };

  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "PDF URL not found",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log(summary);
    } catch (error) {
      console.error(error);
      // call gemini api instead
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log(summary);
        } catch (geminiError) {
          console.error("Error generating summary from gemini", geminiError);
          throw new Error("Error generating summary from gemini");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Error generating summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error generating summary",
      data: null,
    };
  }
}
