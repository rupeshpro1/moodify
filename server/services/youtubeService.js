import fetch from "node-fetch";

export async function searchYouTube(query) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
    console.error("YouTube API Key is missing or invalid.");
    return { items: [] };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`
    );
    
    if (!res.ok) {
        const errorData = await res.json();
        console.error("YouTube API Error:", errorData);
        return { items: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return { items: [] };
  }
}
