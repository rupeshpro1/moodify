import { useState } from "react";

export default function usePlayer() {
  const [currentVideoId, setCurrentVideoId] = useState("");

  const play = (videoId) => {
    setCurrentVideoId(videoId);
  };

  return {
    currentVideoId,
    play
  };
}
