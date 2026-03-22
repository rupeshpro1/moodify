import { detectMood } from "../utils/moodDetector.js";
import { moodMap } from "../utils/moodMap.js";
import { searchYouTube } from "../services/youtubeService.js";

export const searchSongs = async (req, res) => {
  const { query } = req.query;

  if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
  }

  const mood = detectMood(query);
  const finalQuery = moodMap[mood] || query; // If mood isn't mapped, fallback to original query might be wrong if mood logic is strict, but based on prompt code: `const finalQuery = moodMap[mood] || query;`

  console.log(`Detected mood: ${mood}, Searching for: ${finalQuery}`);

  const data = await searchYouTube(finalQuery);

  if (!data || !data.items) {
      return res.status(500).json({ error: "Failed to fetch data from YouTube" });
  }

  res.json({ mood, results: data.items });
};
