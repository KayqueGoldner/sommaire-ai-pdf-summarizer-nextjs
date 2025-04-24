"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { getDbConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/format-utils";

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

    const fomattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        title: fomattedFileName,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error generating summary",
      data: null,
    };
  }
}

interface SavePdfSummaryProps {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: SavePdfSummaryProps) {
  try {
    const sql = await getDbConnection();

    const result = await sql`INSERT INTO pdf_summaries (
      user_id, 
      original_file_url, 
      summary_text, 
      title, 
      file_name
    ) VALUES (
      ${userId}, 
      ${fileUrl}, 
      ${summary}, 
      ${title}, 
      ${fileName}
    )`;

    return result;
  } catch (error) {
    console.error("Error saving pdf summary", error);
    throw new Error("Error saving pdf summary");
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: Omit<SavePdfSummaryProps, "userId">): Promise<
  | {
      success: true;
      message: string;
      data: {
        id: string;
      };
    }
  | {
      success: false;
      message: string;
    }
> {
  let savedSummary: any;

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to store pdf summary",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to store pdf summary",
    };
  }

  // revalidate the summary page
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "Pdf summary stored successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
