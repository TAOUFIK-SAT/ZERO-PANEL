const CACHE_NAME = "taoufik-tv-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Installs the Service Worker and caches boot resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Cleans up old caches as updates deployment happen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Responds network-first to stream dynamic IPTV playlists, falls back to cache for local assets
self.addEventListener("fetch", (event) => {
  const req = event.request;
  
  // Ignore external live stream chunks, ads, analytics or websockets from caching to keep storage clean
  if (
    req.url.includes(".m3u8") || 
    req.url.includes(".ts") || 
    req.url.includes("socket") || 
    req.url.includes("chrome-extension")
  ) {
    return;
  }

  event.respondWith(
    fetch(req).catch(() => {
      return caches.match(req);
    })
  );
});
