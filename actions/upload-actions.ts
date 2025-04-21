"use server";

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
