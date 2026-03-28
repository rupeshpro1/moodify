const libraryItems = [
  { title: "Liked Songs", subtitle: "Playlist", badge: "42 songs" },
  { title: "Daily Hindi Mix", subtitle: "Playlist", badge: "Curated" },
  { title: "Workout Heat", subtitle: "Playlist", badge: "High energy" },
  { title: "Night Chill", subtitle: "Playlist", badge: "Lofi" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-[320px] bg-[#0f0f10] border-r border-white/10 p-4 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Your Library</h2>
        <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition">+</button>
      </div>

      <div className="rounded-2xl p-4 bg-gradient-to-br from-[#4f1c6f] via-[#213a95] to-[#0d7e4b]">
        <p className="font-semibold">Import your music from other apps</p>
        <p className="text-sm text-white/80 mt-2">Bring your playlists, artists, and songs in one place.</p>
        <button className="mt-4 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold">Import library</button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {libraryItems.map((item) => (
          <div key={item.title} className="rounded-xl p-3 bg-white/5 hover:bg-white/10 transition cursor-pointer">
            <p className="font-medium leading-tight">{item.title}</p>
            <p className="text-sm text-white/70">{item.subtitle} . {item.badge}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
