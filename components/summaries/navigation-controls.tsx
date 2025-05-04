import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavigationControlsProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (section: number) => void;
}

export const NavigationControls = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: NavigationControlsProps) => {
  return (
    <div className="bg-background/80 absolute right-0 bottom-0 left-0 border-t border-rose-500/10 p-4 backdrop-blur-xs">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            "size-12 rounded-full border border-rose-500/10 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs transition-all duration-200",
            currentSection === 0 ? "opacity-50" : "hover:bg-rose-500/20",
          )}
        >
          <ChevronLeft className="size-6" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <Button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                "size-2 rounded-full p-0 transition-all duration-300",
                currentSection === index
                  ? "bg-linear-to-r from-rose-500 to-rose-600"
                  : "bg-rose-500/20 hover:bg-rose-500/30",
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            "size-12 rounded-full border border-rose-500/10 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs transition-all duration-200",
            currentSection === totalSections - 1
              ? "opacity-50"
              : "hover:bg-rose-500/20",
          )}
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>
    </div>
  );
};
