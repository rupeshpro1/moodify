"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { searchSongs } from "@/lib/api";
import { moodTags } from "@/lib/moodMap";
import usePlayer from "@/hooks/usePlayer";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import MoodChips from "@/components/MoodChips";
import SongCard from "@/components/SongCard";
import Player from "@/components/Player";

export default function Home() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [detectedMood, setDetectedMood] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentVideoId, currentTrack, play } = usePlayer();

  const handleSearch = async (e, searchQuery = null) => {
    if (e?.preventDefault) e.preventDefault();

    const query = searchQuery || input.trim();
    const normalized = query.toLowerCase();
    if (normalized === "/log" || normalized === "log") {
      router.push("/log");
      return;
    }

    if (!query && !selectedTag) return;

    setLoading(true);
    try {
      const data = await searchSongs(query, selectedTag);
      setSongs(data.results || []);
      setDetectedMood(data.mood || "");
      if (searchQuery) setInput(searchQuery);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleArtistClick = (artistName) => {
    handleSearch(null, artistName);
  };

  useEffect(() => {
    if (!selectedTag) return;
    handleSearch();
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-28">
      <div className="md:h-[calc(100vh-96px)] md:grid md:grid-cols-[320px_1fr] overflow-hidden">
        <Sidebar onArtistClick={handleArtistClick} />

        <main className="overflow-y-auto">
          <Topbar
            input={input}
            setInput={setInput}
            onSearch={handleSearch}
            loading={loading}
            selectedTag={selectedTag}
          />

          <MoodChips
            moods={moodTags}
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
          />

          <section className="px-4 md:px-6 pt-5">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Made for your mood</h1>
              {detectedMood ? (
                <span className="text-sm px-3 py-1 rounded-full bg-white/10 border border-white/15">
                  Brain mood: {detectedMood}
                </span>
              ) : null}
            </div>

            {songs.length === 0 && !loading ? (
              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#121212] to-[#0d1726] p-6">
                <p className="text-lg font-semibold">Search with text and tags</p>
                <p className="text-white/70 mt-2">Try: feel low + Sad, gym + Angry, night + Chill, exam + Focus.</p>
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {songs.map((song) => (
                <SongCard key={song?.id?.videoId || song?.etag} song={song} onPlay={play} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Player videoId={currentVideoId} track={currentTrack} />
    </div>
  );
}
