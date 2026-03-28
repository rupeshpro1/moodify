export default function Topbar({ input, setInput, onSearch, loading, selectedTag }) {
  return (
    <div className="sticky top-0 z-30 bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-md px-4 md:px-6 py-4 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <form onSubmit={onSearch} className="flex-1 flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/15">
          <span className="text-white/60 mr-2">🔎</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you want to play?"
            className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
          />
        </form>

        <div className="flex items-center gap-2">
          {selectedTag ? (
            <span className="px-3 py-1 rounded-full bg-[#f3b31a] text-black text-sm font-semibold">Tag: {selectedTag}</span>
          ) : null}
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:scale-[1.02] disabled:opacity-60 transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}
