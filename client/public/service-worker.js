// Flag for enabling cache in production
var doCache = true;
var CACHE_NAME = 'pwa-app-cache';
// Delete old caches
self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});


self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        fetch('manifest.json')
          .then(response => {
            response.json();
          })
          .then(assets => {
            // We will cache initial page and the main.js
            // We could also cache assets like CSS and images
            const urlsToCache = ['/', assets['main.js']];
            cache.addAll(urlsToCache);
          });
      })
    );
  }
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.error(
        '[Service Worker] Network request Failed. Serving content from cache: ' +
          error
      );
      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches
        .open(
          'sw-precache-v3-sw-precache-webpack-plugin-https://silent-things.surge.sh'
        )
        .then(function(cache) {
          return cache.match(event.request).then(function(matching) {
            var report =
              !matching || matching.status == 404
                ? Promise.reject('no-match')
                : matching;
            return report;
          });
        });
    })
  );
});
