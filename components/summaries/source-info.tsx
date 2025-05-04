import { ExternalLinkIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DownloadSummaryButton } from "@/components/summaries/download-summary-button";

interface SourceInfoProps {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}

export const SourceInfo = ({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: SourceInfoProps) => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm lg:flex-row">
      <div className="flex items-center justify-center gap-2">
        <FileTextIcon className="size-4 text-rose-400" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          asChild
        >
          <Link href={originalFileUrl} target="_blank">
            <ExternalLinkIcon className="size-4" />
            View original
          </Link>
        </Button>
        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};
