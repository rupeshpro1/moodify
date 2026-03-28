export default function SongCard({ song, onPlay }) {
  const videoId = song?.id?.videoId || "";
  const kind = (song?.id?.kind || "").replace("youtube#", "") || "resource";
  const thumb = song?.snippet?.thumbnails?.high?.url || song?.snippet?.thumbnails?.medium?.url || song?.snippet?.thumbnails?.default?.url;
  const title = song?.snippet?.title || "Untitled";
  const channel = song?.snippet?.channelTitle || "Unknown channel";

  if (!thumb) return null;

  return (
    <button
      onClick={() => {
        if (videoId) onPlay(song);
      }}
      className="text-left rounded-xl p-3 bg-white/5 hover:bg-white/10 transition group"
    >
      <img
        src={thumb}
        alt={title}
        className="w-full aspect-square rounded-lg object-cover mb-3 group-hover:brightness-110 transition"
      />
      <div className="mb-2">
        <span className="inline-flex px-2 py-1 text-[11px] uppercase tracking-wide rounded-full bg-white/10 text-white/80 border border-white/15">
          {kind}
        </span>
      </div>
      <p className="font-semibold line-clamp-2 leading-tight">{title}</p>
      <p className="text-sm text-white/65 mt-1 line-clamp-1">{channel}</p>
      {!videoId ? <p className="text-xs text-white/40 mt-2">Preview only (not playable)</p> : null}
    </button>
  );
}
