import Link from "next/link";
import { FileTextIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card } from "@/components/ui/card";
import { cn, formatFileName } from "@/lib/utils";

import { DeleteButton } from "./delete-button";

interface SummaryCardProps {
  summary: any;
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />

            <p className="line-clamp-2 pl-2 text-sm text-gray-600 sm:text-base">
              {summary.summary_text}
            </p>

            <div className="mt-2 flex items-center justify-between sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

interface SummaryHeaderProps {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}

const SummaryHeader = ({ fileUrl, title, createdAt }: SummaryHeaderProps) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileTextIcon className="mt-1 size-6 text-rose-400 sm:size-8" />
      <div className="min-w-0 flex-1">
        <h3 className="w-4/5 truncate text-base font-semibold text-gray-900 xl:text-lg">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800",
      )}
    >
      {status}
    </span>
  );
};
