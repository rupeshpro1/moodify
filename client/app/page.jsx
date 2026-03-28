"use client";

import { useEffect, useState } from "react";
import { searchSongs } from "@/lib/api";
import { moodTags } from "@/lib/moodMap";
import usePlayer from "@/hooks/usePlayer";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import MoodChips from "@/components/MoodChips";
import SongCard from "@/components/SongCard";
import Player from "@/components/Player";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [detectedMood, setDetectedMood] = useState("");
  const [apiMeta, setApiMeta] = useState(null);
  const [apiReferenceMatches, setApiReferenceMatches] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalResults: 0, resultsPerPage: 0 });
  const [loading, setLoading] = useState(false);
  const { currentVideoId, play } = usePlayer();

  const handleSearch = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!input.trim() && !selectedTag) return;

    setLoading(true);
    try {
      const data = await searchSongs(input.trim(), selectedTag);
      setSongs(data.results || []);
      setDetectedMood(data.mood || "");
      setApiMeta(data.api || null);
      setApiReferenceMatches(data.apiReferenceMatches || []);
      setPageInfo(data.pageInfo || { totalResults: 0, resultsPerPage: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedTag) return;
    handleSearch();
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-28">
      <div className="md:h-[calc(100vh-96px)] md:grid md:grid-cols-[320px_1fr] overflow-hidden">
        <Sidebar />

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

            <p className="text-white/65 mt-2">
              Layer 1: mood detection, Layer 2: query builder, Layer 3: YouTube API results.
            </p>

            {apiMeta ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-lg font-semibold">YouTube Data API v3</h2>
                <p className="text-sm text-white/75 mt-1">Endpoint: {apiMeta.endpoint}</p>
                <p className="text-sm text-white/75">Method: {apiMeta.method}</p>
                <p className="text-sm text-white/75">Auth: {apiMeta.requiredAuth}</p>
                <p className="text-sm text-white/75 mt-2">
                  Returned: {songs.length} items . Total results: {pageInfo?.totalResults || 0} . Per page: {pageInfo?.resultsPerPage || 0}
                </p>
              </div>
            ) : null}

            {apiReferenceMatches.length > 0 ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#101828] to-[#1a1033] p-4">
                <h3 className="text-lg font-semibold">API Reference matches</h3>
                <div className="mt-3 grid md:grid-cols-2 gap-3">
                  {apiReferenceMatches.map((entry) => (
                    <div key={entry.resource} className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <p className="font-semibold">{entry.resource}</p>
                      <p className="text-sm text-white/70 mt-1">{entry.description}</p>
                      <p className="text-xs text-white/55 mt-2">{entry.methods.join(" . ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

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

      <Player videoId={currentVideoId} />
    </div>
  );
}
