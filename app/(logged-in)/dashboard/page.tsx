import Link from "next/link";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { BgGradient } from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { EmptySummaryState } from "@/components/summaries/empty-summary-state";

const DashboardPage = async () => {
  const uploadLimit = 5;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const summaries = await getSummaries(user.id);

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="mb-8 flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights.
              </p>
            </div>
            <Button
              className="bg-linear-to-r from-rose-500 to-rose-700 text-white transition-all duration-300 hover:scale-105 hover:from-rose-600 hover:to-rose-800"
              asChild
            >
              <Link href="/upload">
                <PlusIcon className="mr-2 size-4" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of {uploadLimit} uploads on the basic
                plan.
              </p>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-800 underline underline-offset-4"
              >
                Upgrade to Pro
                <ArrowRightIcon className="inline-block size-4" />
              </Link>
              <span className="text-sm">for unlimited uploads.</span>
            </div>
          </div>

          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:px-0 md:grid-cols-2 lg:grid-cols-3">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
