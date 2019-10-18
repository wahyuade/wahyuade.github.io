var CACHE = 'wahyu-cache';
 
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.'); 
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
});
 
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
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
    ]);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}