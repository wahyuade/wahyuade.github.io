const version = "1.0.0";
const cacheName = `wahyu-cache-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        './index.html',
        './images/ijazah-pens.jpg',
        './images/img_8.jpg',
        './images/pens.png',
        './images/profil.jpg',
        './images/sd.png',
        './images/sma.gif',
        './images/sma.jpg',
        './images/smp.jpg',
        './images/smp.png',
        './images/tk.png',
        './images/tk.jpg',
        './vendor/jquery/jquery.min.js',
        './vendor/bootstrap/js/bootstrap.bundle.min.js',
        './vendor/jquery-easing/jquery.easing.min.js',
        './js/freelancer.min.js',
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});