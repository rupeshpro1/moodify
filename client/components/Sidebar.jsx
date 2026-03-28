const topArtists = [
  { name: "The Weeknd" },
  { name: "Adam Levine" },
  { name: "Chainsmokers" },
  { name: "Maroon 5" },
  { name: "Atlantic Records" },
  { name: "Chase" }
];

export default function Sidebar({ onArtistClick }) {
  return (
    <aside className="hidden md:flex md:flex-col w-[320px] bg-[#0f0f10] border-r border-white/10 p-6 gap-6 overflow-y-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff5a5f] via-[#ff9f1c] to-[#2ec4b6] grid place-items-center shadow-lg shadow-black/40">
          <span className="text-black font-black text-xl">M</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/55">App</p>
          <h2 className="text-2xl font-bold tracking-tight">Moodify</h2>
        </div>
      </div>

      <div className="rounded-2xl p-4 border border-white/10 bg-white/5">
        <p className="text-white/80 text-sm leading-relaxed">
          Search by mood and play instantly.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.1em] text-white/55 font-semibold">Top Artists</p>
        <div className="flex flex-col gap-2">
          {topArtists.map((artist) => (
            <button
              key={artist.name}
              onClick={() => onArtistClick?.(artist.name)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm font-medium truncate"
            >
              {artist.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
