var staticAssets = [
  ".",
  "/index.html",
  "/css/style.css",
  "/css/animate.css",
  "/app.js"
]
self.addEventListener('install', (ev) => {
  console.log('installed');
  ev.waitUntil(
    caches.open("staticAssets-v2")
      .then((cache) => {
        cache.addAll(staticAssets)
        console.log("Added StaticAssets In Cache");
      })
  )
});
self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(keys.map((key) => {
          if (key !== 'staticAssets-v2' && key !== 'dynamicAssets-v2') {
            return caches.delete(key)
          }
        }))
      })
  )
})

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    return ev.respondWith(cacheFirst(req));
  } else {
    try {
      return ev.respondWith(networkFirst(req));
    } catch{ }
  }
});

async function cacheFirst(req) {
  let cacheRes = await caches.match(req);
  return cacheRes || fetch(req);
}
async function networkFirst(req) {
  const dynamicCache = await caches.open('dynamicAssets-v2');
  try {
    const networkResponse = await fetch(req);
    if (req.method == 'GET') {
      dynamicCache.put(req, networkResponse.clone());
      return networkResponse;
    } else {
      return networkResponse;
    }
  } catch (err) {
    const cacheResponse = await caches.match(req);
    return cacheResponse;
  }
}
