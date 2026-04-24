const CACHE_NAME = "dossochat-v1";
const assetsToCache = [
    "/",
    "/css/site.css",
    "/js/site.js",
    "/lib/bootstrap/dist/css/bootstrap.min.css",
    "/lib/jquery/dist/jquery.min.js",
    "/assets/icons/logo.png",
    "/assets/icons/logo-192.png",
    "/assets/icons/logo-512.png",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
];

// Uygulama yüklendiğinde dosyaları önbelleğe al
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// İnternet olmasa bile önbellekten dosyaları getir
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Eski önbellekleri temizle
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});