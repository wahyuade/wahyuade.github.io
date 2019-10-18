var CACHE = 'wahyu-cache';
 
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.'); 
  evt.waitUntil(precache());
});

 
addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE)
                .then(function(cache) {
                  cache.put(event.request.url, res);    //save the response for future
                  return res;   // return the fetched data
                })
            })
            // .catch(function(err) {       // fallback mechanism
            //   return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
            //     .then(function(cache) {
            //       return cache.match('/offline.html');
            //     });
            // });
        }
      })
  );
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