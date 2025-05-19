import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { BgGradient } from "./bg-gradient";

const UpgradeRequired = () => {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container px-8 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-rose-500">
            <SparklesIcon className="size-6" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Premium Feature
            </span>
          </div>

          <h1 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Subscription Required
          </h1>
          <p className="max-w-xl rounded-lg border-2 border-dashed border-rose-200 bg-white/50 p-6 text-lg leading-8 text-gray-600 backdrop-blur-xs">
            You need to upgrade to the Basic plan or the Pro plan to access this
            feature. 💖
          </p>
          <Button
            className="bg-linear-to-r from-rose-500 to-rose-700 text-white hover:from-rose-600 hover:to-rose-800"
            asChild
          >
            <Link href="/#pricing" className="flex items-center gap-2">
              View Pricing Plans
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeRequired;
