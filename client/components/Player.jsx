export default function Player({ videoId }) {
  if (!videoId) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-black/95 border-t border-white/10 z-50 px-3 py-2">
      <div className="h-full w-full rounded-lg overflow-hidden border border-white/10">
        <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
