"use client";

import { useState } from "react";
import { searchSongs } from "@/lib/api";
import Player from "@/components/Player";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (!input.trim()) return;
    
    setLoading(true);
    try {
        const data = await searchSongs(input);
        setSongs(data.results || []);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Moodify 🎵</h1>
      
      <div className="max-w-xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search or describe your mood..."
                className="flex-1 p-3 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500 transition-colors"
            />
            <button 
                type="submit" 
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs && songs.map((song) => (
          <div 
            key={song.id.videoId} 
            className="cursor-pointer group relative bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-colors"
            onClick={() => setCurrentVideoId(song.id.videoId)}
          >
            <div className="aspect-video relative overflow-hidden">
                <img 
                    src={song.snippet.thumbnails.medium.url} 
                    alt={song.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2 mb-1" title={song.snippet.title}>
                    {song.snippet.title}
                </h3>
                <p className="text-xs text-zinc-400">{song.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>

      <Player videoId={currentVideoId} />
    </div>
  );
}
