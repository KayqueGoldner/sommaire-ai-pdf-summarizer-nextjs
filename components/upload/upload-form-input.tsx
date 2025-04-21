import { forwardRef } from "react";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  UploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <form onSubmit={onSubmit} ref={ref} className="flex flex-col gap-6">
      <div className="flex items-center justify-end gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required={true}
          className={cn(isLoading && "cursor-not-allowed opacity-50")}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Generating summary...
            </>
          ) : (
            "Generate summary"
          )}
        </Button>
      </div>
    </form>
  );
});

UploadFormInput.displayName = "UploadFormInput";
