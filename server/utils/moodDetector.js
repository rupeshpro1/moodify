export function detectMood(text) {
  const normalized = (text || "").toLowerCase();

  if (/(sad|cry|heartbreak|broken|lonely|feeling low)/.test(normalized)) return "sad";
  if (/(happy|joy|good mood|excited|celebrate)/.test(normalized)) return "happy";
  if (/(gym|angry|rage|workout|beast mode)/.test(normalized)) return "angry";
  if (/(chill|relax|calm|peace)/.test(normalized)) return "chill";
  if (/(study|focus|deep work|exam|concentration)/.test(normalized)) return "focus";
  if (/(party|dance|club)/.test(normalized)) return "party";
  if (/(romantic|love|date)/.test(normalized)) return "romantic";
  if (/(sleep|night|insomnia)/.test(normalized)) return "sleep";
  if (/(devotional|bhakti|spiritual)/.test(normalized)) return "devotional";
  if (/(travel|road trip|drive)/.test(normalized)) return "travel";
  if (/(energetic|motivation|pump)/.test(normalized)) return "energetic";

  return "general";
}
