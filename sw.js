const CACHE_NAME = 'pt-us-v2';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.map(x => caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate' || e.request.url.includes('.html')) {
    return e.respondWith(fetch(e.request));
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
