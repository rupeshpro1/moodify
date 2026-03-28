export default function LogPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white px-5 py-8 md:px-10 md:py-12">
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold">Log</h1>
        <p className="text-white/70 mt-2 text-sm">Hidden diagnostics page. Opened by typing /log in search.</p>

        <div className="mt-6 space-y-3 text-white/90 leading-relaxed">
          <p>Layer 1: mood detection, Layer 2: query builder, Layer 3: YouTube API results.</p>

          <h2 className="text-xl font-semibold pt-2">YouTube Data API v3</h2>
          <p>Endpoint: https://www.googleapis.com/youtube/v3/search</p>
          <p>Method: GET</p>
          <p>Auth: API key (key parameter) or OAuth 2.0 token</p>
          <p>Returned: 20 items . Total results: 1000000 . Per page: 20</p>
        </div>
      </div>
    </main>
  );
}
