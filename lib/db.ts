"use server";

import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(DATABASE_URL);

  return sql;
}
