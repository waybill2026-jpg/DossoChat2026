const cacheName = 'dosso-v2';
const staticAssets = [
  '/',
  '/Login',
  '/assets/icons/logo.png'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
