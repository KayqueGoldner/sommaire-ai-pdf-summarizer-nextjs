import { BgGradient } from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSkeleton } from "@/components/upload/loading-skeleton";

const SummariesIdLoading = () => {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4 py-10">
        <div className="px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8">
            <HeaderSkeleton />

            <div className="relative overflow-hidden">
              <div className="relative mx-auto max-w-4xl rounded-2xl border border-rose-100/30 bg-white/80 p-8 backdrop-blur-md">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50" />

                <div className="absolute top-4 right-4 text-rose-300/20">
                  <Skeleton className="size-3 sm:size-4" />
                </div>

                <div className="relative">
                  <LoadingSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function HeaderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-full bg-white/80" />
        <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
        <Skeleton className="h-12 w-3/4 rounded-full bg-white/80" />
      </div>
    </div>
  );
}

export default SummariesIdLoading;
