interface SummaryViewerProps {
  summary: string;
}

export const SummaryViewer = ({ summary }: SummaryViewerProps) => {
  return (
    <div>
      <p>{summary}</p>
    </div>
  );
};
