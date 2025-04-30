"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { getDbConnection } from "@/lib/db";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const sql = await getDbConnection();

    const deletedSummary = await sql`
      DELETE FROM pdf_summaries
      WHERE id = ${summaryId} AND user_id = ${userId}
      RETURNING *
    `;

    if (deletedSummary.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error("Error deleting summary", error);
    return {
      success: false,
    };
  }
}
