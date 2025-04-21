import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return {
        userId: user.id,
      };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for", metadata.userId);
      console.log("File url", file.ufsUrl);

      return {
        userId: metadata.userId,
        file: file,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
