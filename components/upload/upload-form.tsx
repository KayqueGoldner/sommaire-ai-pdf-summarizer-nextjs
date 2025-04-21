"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useRef, useState } from "react";

import { useUploadThing } from "@/utils/uploadthing";
import { generatePdfSummary } from "@/actions/upload-actions";

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
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

    try {
      setIsLoading(true);

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

      toast.loading("PDF uploaded successfully. Summarizing...", {
        id: "processing",
      });

      const result = await generatePdfSummary(res);

      const { data = null, message = null } = result || {};

      if (data) {
        toast.loading("PDF summary generated successfully. Saving...", {
          id: "processing",
        });
        formRef.current?.reset();

        if (data.summary) {
          // save to db
        }
      } else {
        toast.error(message, { id: "processing" });
      }
    } catch (error) {
      console.error(error);
      formRef.current?.reset();
      toast.error("Error generating summary", { id: "processing" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput
        ref={formRef}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
