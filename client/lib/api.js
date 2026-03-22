export const searchSongs = async (query) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  try {
    const res = await fetch(
      `${apiUrl}/api/search?query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('Failed to fetch songs');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return { results: [] };
  }
}
