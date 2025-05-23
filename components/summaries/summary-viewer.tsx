"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  parseEmojiPoint,
  parsePoint,
  parseSection,
} from "@/utils/summary-helper";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

import { ProgressBar } from "./progress-bar";
import { NavigationControls } from "./navigation-controls";

interface SummaryViewerProps {
  summary: string;
}

export const SummaryViewer = ({ summary }: SummaryViewerProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card className="from-background via-background/95 relative w-full overflow-hidden rounded-3xl border border-rose-500/10 bg-linear-to-br to-rose-500/5 px-2 shadow-2xl backdrop-blur-lg">
      <ProgressBar sections={sections} currentSection={currentSection} />
      <CardHeader className="py-0 pt-10">
        <SectionTitle title={sections[currentSection].title} />
      </CardHeader>
      <CardContent className="w-full pb-20">
        <MotionDiv
          key={currentSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="scrollbar-hide h-full overflow-y-auto"
        >
          <div className="px-4 sm:px-6">
            <SectionContent points={sections[currentSection].points} />
          </div>
        </MotionDiv>
      </CardContent>
      <CardFooter>
        <NavigationControls
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSectionSelect={setCurrentSection}
        />
      </CardFooter>
    </Card>
  );
};

function SectionTitle({ title }: { title: string }) {
  return (
    <CardTitle className="px-4 text-center text-2xl font-bold text-rose-500 sm:px-6">
      {title}
    </CardTitle>
  );
}

function SectionContent({ points }: { points: string[] }) {
  return (
    <MotionDiv
      key={points.join("")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
    >
      {points.map((point) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={point} point={point} />;
        }

        return <RegularPoint key={point} point={point} />;
      })}
    </MotionDiv>
  );
}

function EmojiPoint({ point }: { point: string }) {
  const { emoji, text } = parseEmojiPoint(point) || {};

  return (
    <MotionDiv
      variants={itemVariants}
      className="group bg-muted-foreground/5 relative rounded-2xl border p-4"
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-gray-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-start gap-3 px-2">
        <span className="shrink-0 pt-1 text-lg lg:text-xl">{emoji}</span>
        <p className="text-muted-foreground/90 text-sm lg:text-xl">{text}</p>
      </div>
    </MotionDiv>
  );
}

function RegularPoint({ point }: { point: string }) {
  return (
    <MotionDiv
      variants={itemVariants}
      className="group bg-muted-foreground/5 relative rounded-2xl border p-4"
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-gray-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <p className="text-muted-foreground/90 relative text-left text-sm leading-snug lg:text-xl">
        {point}
      </p>
    </MotionDiv>
  );
}
