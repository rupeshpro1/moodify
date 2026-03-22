export function detectMood(text) {
  text = text.toLowerCase();

  if (text.includes("sad") || text.includes("cry")) return "sad";
  if (text.includes("gym") || text.includes("angry")) return "angry";
  if (text.includes("chill")) return "chill";
  if (text.includes("study")) return "focus";

  return "general";
}
