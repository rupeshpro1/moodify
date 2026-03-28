export default function MoodChips({ moods, selectedTag, onSelect }) {
  return (
    <div className="flex items-center gap-2 flex-wrap px-4 md:px-6 pt-4">
      {moods.map((mood) => {
        const active = selectedTag === mood.value;
        return (
          <button
            key={mood.value}
            onClick={() => onSelect(active ? "" : mood.value)}
            className={[
              "px-4 py-2 rounded-full text-sm font-medium border transition",
              active
                ? "bg-white text-black border-white"
                : "bg-white/10 text-white border-white/15 hover:bg-white/20"
            ].join(" ")}
          >
            {mood.label}
          </button>
        );
      })}
    </div>
  );
}
