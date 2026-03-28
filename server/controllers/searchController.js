import { detectMood } from "../utils/moodDetector.js";
import { moodMap } from "../utils/moodMap.js";
import { searchYouTube } from "../services/youtubeService.js";
import { searchApiReference } from "../utils/youtubeApiReference.js";

export const searchSongs = async (req, res) => {
  const { query = "", tag = "" } = req.query;

  if (!query.trim() && !tag.trim()) {
      return res.status(400).json({ error: "Provide query or tag" });
  }

  const signalText = `${query} ${tag}`.trim();
  const mood = detectMood(signalText);
  const brainQuery = moodMap[mood] || moodMap.general;
  const finalQuery = [brainQuery, tag, query]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");

  console.log(`Detected mood: ${mood}, Searching for: ${finalQuery}`);

  const data = await searchYouTube(finalQuery, {
    type: "video,channel,playlist",
    maxResults: 20
  });

  if (!data || !data.items) {
      return res.status(500).json({ error: "Failed to fetch data from YouTube" });
  }

  const apiReferenceMatches = searchApiReference(`${query} ${tag}`);

  res.json({
    mood,
    tag,
    finalQuery,
    api: {
      name: "YouTube Data API v3",
      endpoint: "https://www.googleapis.com/youtube/v3/search",
      method: "GET",
      requiredAuth: "API key (key parameter) or OAuth 2.0 token",
      requestParams: {
        part: "snippet",
        q: finalQuery,
        type: "video,channel,playlist",
        maxResults: 20
      }
    },
    pageInfo: data.pageInfo || { totalResults: data.items.length, resultsPerPage: data.items.length },
    nextPageToken: data.nextPageToken || "",
    apiReferenceMatches,
    results: data.items
  });
};
