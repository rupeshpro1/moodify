import fetch from "node-fetch";

export async function searchYouTube(query, options = {}) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const type = options.type || "video,channel,playlist";
  const maxResults = options.maxResults || 20;

  if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
    console.error("YouTube API Key is missing or invalid.");
    return { items: [], pageInfo: { totalResults: 0, resultsPerPage: 0 }, nextPageToken: "" };
  }

  try {
    const endpoint = new URL("https://www.googleapis.com/youtube/v3/search");
    endpoint.searchParams.set("part", "snippet");
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("type", type);
    endpoint.searchParams.set("maxResults", String(maxResults));
    endpoint.searchParams.set("key", apiKey);

    const res = await fetch(
      endpoint.toString()
    );
    
    if (!res.ok) {
        const errorData = await res.json();
        console.error("YouTube API Error:", errorData);
        return {
          items: [],
          pageInfo: { totalResults: 0, resultsPerPage: 0 },
          nextPageToken: "",
          error: errorData
        };
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return { items: [], pageInfo: { totalResults: 0, resultsPerPage: 0 }, nextPageToken: "" };
  }
}
