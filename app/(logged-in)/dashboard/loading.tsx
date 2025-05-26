import { itemVariants } from "@/utils/constants";
import { BgGradient } from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div className="relative min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <section className="container mx-auto flex flex-col gap-4 px-10 py-24">
        <HeaderSkeleton />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:px-0 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

function HeaderSkeleton() {
  return (
    <div className="mb-8 flex justify-between gap-4">
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent"
        >
          <Skeleton className="h-10 w-48" />
        </MotionH1>
        <MotionP
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-600"
        >
          <Skeleton className="h-6 w-96" />
        </MotionP>
      </div>
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="self-start"
      >
        <Skeleton className="h-10 w-32" />
      </MotionDiv>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-card text-card-foreground rounded-lg border shadow-sm"
    >
      <Skeleton className="h-48 w-full rounded-lg" />
    </MotionDiv>
  );
}

export default DashboardLoading;
