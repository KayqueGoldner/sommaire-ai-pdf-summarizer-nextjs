"use client";

import { z } from "zod";
import { toast } from "sonner";

import { useUploadThing } from "@/utils/uploadthing";

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
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (error) => {
      console.error("error occurred while uploading", error);
      toast.error("Error uploading file", {
        duration: 5000,
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validate fields
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      toast.error("Invalid file", {
        duration: 5000,
      });
      return;
    }

    toast.loading("Uploading PDF...", { id: "processing" });

    const res = await startUpload([file]);

    if (!res) {
      toast.error("Error uploading PDF", { id: "processing" });
      return;
    }

    toast.success("PDF uploaded successfully. Summarizing...", {
      id: "processing",
    });

    console.log(validatedFields.data.file);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};
