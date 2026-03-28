"use client";

import { useState, useEffect, useRef } from "react";

function formatTitle(track) {
  return track?.snippet?.title || "Now playing";
}

function formatArtist(track) {
  return track?.snippet?.channelTitle || "Moodify Radio";
}

function trackThumb(track) {
  return (
    track?.snippet?.thumbnails?.default?.url ||
    track?.snippet?.thumbnails?.medium?.url ||
    track?.snippet?.thumbnails?.high?.url ||
    ""
  );
}

export default function Player({ videoId, track }) {
  const title = formatTitle(track);
  const artist = formatArtist(track);
  const thumb = trackThumb(track);
  const isActive = Boolean(videoId);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(74);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else if (isActive && iframeRef.current) {
      initPlayer();
    }
  }, [isActive, videoId]);

  const initPlayer = () => {
    if (!window.YT) return;
    if (playerRef.current && playerRef.current.destroy) {
      playerRef.current.destroy();
    }
    if (iframeRef.current) {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: handlePlayerReady,
          onStateChange: handleStateChange,
        },
      });
    }
  };

  const handlePlayerReady = (event) => {
    if (volume !== 74) {
      event.target.setVolume(volume);
    }
  };

  const handleStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          setCurrentTime(playerRef.current.getCurrentTime());
          setDuration(playerRef.current.getDuration());
        } catch (e) {
          // Player not ready
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isActive]);

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const skipForward = () => {
    if (!playerRef.current) return;
    const newTime = Math.min(currentTime + 10, duration);
    playerRef.current.seekTo(newTime);
  };

  const skipBackward = () => {
    if (!playerRef.current) return;
    const newTime = Math.max(currentTime - 10, 0);
    playerRef.current.seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const volumeDown = () => {
    const newVolume = Math.max(volume - 10, 0);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const volumeUp = () => {
    const newVolume = Math.min(volume + 10, 100);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-[#070707]/95 border-t border-white/10 z-50 px-3 md:px-4">
      <div className="h-full grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              className="w-14 h-14 rounded-md object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-md bg-white/10" />
          )}
          <div className="min-w-0">
            <p className={`text-sm font-medium leading-tight truncate ${!isActive ? 'text-white/50' : ''}`}>{title}</p>
            <p className={`text-xs truncate mt-1 ${!isActive ? 'text-white/30' : 'text-white/60'}`}>{artist}</p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center gap-2 min-w-[420px]">
          <div className="flex items-center gap-5">
            <button 
              onClick={skipBackward}
              className={`transition ${isActive ? 'text-white/80 hover:text-white' : 'text-white/30 cursor-not-allowed'}`} 
              type="button" 
              aria-label="Skip back 10 seconds" 
              disabled={!isActive}
            >
              10&lt;&lt;
            </button>
            <button 
              onClick={togglePlayPause}
              className={`w-9 h-9 rounded-full grid place-items-center transition ${isActive ? 'bg-white text-black hover:scale-105' : 'bg-white/30 text-black/50 cursor-not-allowed'}`} 
              type="button" 
              aria-label="Play or pause" 
              disabled={!isActive}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button 
              onClick={skipForward}
              className={`transition ${isActive ? 'text-white/80 hover:text-white' : 'text-white/30 cursor-not-allowed'}`} 
              type="button" 
              aria-label="Skip forward 10 seconds" 
              disabled={!isActive}
            >
              10&gt;&gt;
            </button>
          </div>
          <div className="w-full flex items-center gap-2 text-xs text-white/65">
            <span>{formatTime(currentTime)}</span>
            <div className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all" 
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }} 
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-3 text-white/70">
          <button 
            onClick={volumeDown}
            className={`transition ${isActive ? 'hover:text-white' : 'cursor-not-allowed'}`}
            type="button"
            aria-label="Volume down"
            disabled={!isActive}
          >
            🔉
          </button>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={handleVolumeChange}
            disabled={!isActive}
            className="w-24 h-1 rounded-full bg-white/20 appearance-none cursor-pointer"
            style={{
              background: isActive ? `linear-gradient(to right, white 0%, white ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)` : 'rgba(255,255,255,0.2)'
            }}
          />
          <button 
            onClick={volumeUp}
            className={`transition ${isActive ? 'hover:text-white' : 'cursor-not-allowed'}`}
            type="button"
            aria-label="Volume up"
            disabled={!isActive}
          >
            🔊
          </button>
        </div>

        {isActive && (
          <div className="w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
            <div
              ref={iframeRef}
              id={`yt-player-${videoId}`}
              style={{ width: "1px", height: "1px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
