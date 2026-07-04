/* App Store service worker — cache-first voor de storepagina zelf.
   Verzoeken onder /apps/ worden bewust overgeslagen: elke app heeft
   een eigen service worker met een specifiekere scope. */
const CACHE = "store-v1";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icons/store-180.png", "./icons/store-192.png", "./icons/store-512.png", "./apps/finance/icons/icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k.startsWith("store-")).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes("/apps/") && !url.pathname.endsWith(".png")) return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const fetched = fetch(e.request).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => hit);
      return hit || fetched;
    })
  );
});
