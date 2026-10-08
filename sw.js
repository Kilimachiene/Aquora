/* AQUORA Service Worker
   Seite und Daten: immer zuerst aus dem Netz, Cache nur als Rückfall.
   Damit erscheint eine neue Version sofort, ohne Cache-Spielchen.
   Bilder und Icons bleiben cache-first, die ändern sich praktisch nie. */
const CACHE = "aquora-v27";
const FILES = ["./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const istSeite = e.request.mode === "navigate"
    || url.pathname.endsWith("/")
    || url.pathname.endsWith(".html")
    || url.pathname.endsWith(".webmanifest");

  if (istSeite) {
    // zuerst Netz, damit Änderungen sofort ankommen
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.ok) {
            const kopie = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, kopie));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res && res.ok) {
        const kopie = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopie));
      }
      return res;
    }))
  );
});
