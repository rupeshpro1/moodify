export const searchSongs = async (query, tag = "") => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  try {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (tag) params.set("tag", tag);

    const res = await fetch(
      `${apiUrl}/api/search?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch songs");
    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { results: [] };
  }
};
