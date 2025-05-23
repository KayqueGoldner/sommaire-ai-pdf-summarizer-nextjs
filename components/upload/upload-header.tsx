import { SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <MotionDiv
        variants={itemVariants}
        className="animate-gradient-x group relative overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 p-px"
      >
        <Badge
          variant="secondary"
          className="relative rounded-full bg-white px-6 py-2 text-base font-medium transition-colors group-hover:bg-gray-50 [&>svg]:size-5"
        >
          <SparklesIcon className="mr-2 size-5 animate-pulse text-rose-600" />
          <p className="text-base">AI-Powered Content Creation</p>
        </Badge>
      </MotionDiv>
      <MotionDiv
        variants={itemVariants}
        className="text-3xl font-bold tracking-tight text-gray-900 capitalize sm:text-4xl"
      >
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF's</span>{" "}
          <span
            className="absolute inset-0 -rotate-2 -skew-y-1 transform rounded-lg bg-rose-200/50"
            aria-hidden="true"
          />
        </span>
      </MotionDiv>
      <MotionDiv
        variants={itemVariants}
        className="mt-2 max-w-2xl text-center text-lg leading-8 text-gray-600"
      >
        <p>Upload your PDF and let our AI do the magic! ✨</p>
      </MotionDiv>
    </div>
  );
};
