import { useState } from "react";

export default function usePlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const currentVideoId = currentTrack?.id?.videoId || "";

  const play = (track) => {
    setCurrentTrack(track);
  };

  return {
    currentVideoId,
    currentTrack,
    play
  };
}
