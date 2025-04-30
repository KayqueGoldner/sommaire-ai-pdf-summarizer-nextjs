"use client";

import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";

import { deleteSummary } from "@/actions/summary-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteButtonProps {
  summaryId: string;
}

export const DeleteButton = ({ summaryId }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummary({ summaryId });

      if (!result.success) {
        toast.error("Failed to delete summary");
        return;
      }

      toast.success("Summary deleted successfully");

      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border border-gray-200 bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className="border border-gray-200 bg-gray-50 hover:bg-gray-50 hover:text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-gray-900 hover:bg-gray-600"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
