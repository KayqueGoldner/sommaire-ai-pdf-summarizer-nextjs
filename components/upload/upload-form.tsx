"use client";

import { z } from "zod";

import { UploadFormInput } from "./upload-form-input";

const schema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File must be less than 24MB",
    }),
});

export const UploadForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validate fields
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
      );
      return;
    }

    console.log(validatedFields.data.file);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};
