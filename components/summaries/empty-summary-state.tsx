import { FileTextIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const EmptySummaryState = () => {
  return (
    <div className="py-12 text-center">
      <div className="flex flex-col items-center gap-1">
        <FileTextIcon className="size-16 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-600">
          No summaries yet
        </h3>
        <p className="text-sm text-gray-500">
          Upload a PDF to create a summary
        </p>
        <Button
          className="mt-4 bg-linear-to-r from-rose-500 to-rose-700 text-white hover:from-rose-600 hover:to-rose-800"
          asChild
        >
          <Link href="/upload">Upload PDF</Link>
        </Button>
      </div>
    </div>
  );
};
