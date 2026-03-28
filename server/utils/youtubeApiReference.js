export const youtubeApiReference = [
  { resource: "activities", methods: ["GET /activities"], description: "Returns channel activity events." },
  { resource: "captions", methods: ["GET /captions", "GET /captions/id", "POST /captions", "PUT /captions", "DELETE /captions"], description: "Manage caption tracks for a video." },
  { resource: "channelBanners", methods: ["POST /channelBanners/insert"], description: "Upload a banner image for a channel." },
  { resource: "channelSections", methods: ["GET /channelSections", "POST /channelSections", "PUT /channelSections", "DELETE /channelSections"], description: "Manage featured channel shelves." },
  { resource: "channels", methods: ["GET /channels", "PUT /channels"], description: "Read or update channel metadata." },
  { resource: "commentThreads", methods: ["GET /commentThreads", "POST /commentThreads"], description: "Read/create top-level comment threads." },
  { resource: "comments", methods: ["GET /comments", "POST /comments", "PUT /comments", "DELETE /comments", "POST /comments/setModerationStatus"], description: "Manage individual comments and moderation." },
  { resource: "i18nLanguages", methods: ["GET /i18nLanguages"], description: "List UI languages supported by YouTube." },
  { resource: "i18nRegions", methods: ["GET /i18nRegions"], description: "List content regions supported by YouTube." },
  { resource: "members", methods: ["GET /members"], description: "List members for authorized channels." },
  { resource: "membershipsLevels", methods: ["GET /membershipsLevels"], description: "List authorized channel membership levels." },
  { resource: "playlistItems", methods: ["GET /playlistItems", "POST /playlistItems", "PUT /playlistItems", "DELETE /playlistItems"], description: "Manage items inside playlists." },
  { resource: "playlists", methods: ["GET /playlists", "POST /playlists", "PUT /playlists", "DELETE /playlists"], description: "Manage playlists." },
  { resource: "search", methods: ["GET /search"], description: "Search videos, channels, and playlists." },
  { resource: "subscriptions", methods: ["GET /subscriptions", "POST /subscriptions", "DELETE /subscriptions"], description: "Manage subscriptions." },
  { resource: "thumbnails", methods: ["POST /thumbnails/set"], description: "Upload and set custom thumbnails." },
  { resource: "videoAbuseReportReasons", methods: ["GET /videoAbuseReportReasons"], description: "List abuse report reasons." },
  { resource: "videoCategories", methods: ["GET /videoCategories"], description: "List video categories." },
  { resource: "videos", methods: ["GET /videos", "POST /videos", "PUT /videos", "DELETE /videos", "POST /videos/rate", "GET /videos/getRating", "POST /videos/reportAbuse"], description: "Manage and retrieve videos." },
  { resource: "watermarks", methods: ["POST /watermarks/set", "POST /watermarks/unset"], description: "Set or unset channel watermark." }
];

export function searchApiReference(text) {
  const query = (text || "").toLowerCase().trim();
  if (!query) return [];

  return youtubeApiReference
    .filter((entry) => {
      const inResource = entry.resource.toLowerCase().includes(query);
      const inDescription = entry.description.toLowerCase().includes(query);
      const inMethods = entry.methods.some((method) => method.toLowerCase().includes(query));
      return inResource || inDescription || inMethods;
    })
    .slice(0, 6);
}
