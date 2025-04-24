export function formatFileNameAsTitle(fileName: string) {
  // remove the extension
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  // add spaces
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ") // replace dashes and underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // insert space between lowercase and uppercase letters

  // convert to title case
  const titleCase = withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();

  return titleCase;
}
