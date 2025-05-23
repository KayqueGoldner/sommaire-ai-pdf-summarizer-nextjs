import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { BgGradient } from "@/components/common/bg-gradient";
import { UploadForm } from "@/components/upload/upload-form";
import { UploadHeader } from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/user";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { containerVariants } from "@/utils/constants";

const UploadPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const { hasReachedLimit } = await hasReachedUploadLimit(user.id);

  if (hasReachedLimit) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </div>
  );
};

export default UploadPage;
