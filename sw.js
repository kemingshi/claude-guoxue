var CACHE_NAME = 'guoxue-v2';
var PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './app/App.js',
  './app/Sidebar.js',
  './app/SearchBar.js',
  './app/ContentCard.js',
  './app/Actions.js',
  './app/Toast.js',
  './hooks/useRandom.js',
  './hooks/useSearch.js',
  './config/categories.js',
  './data/poems.js',
  './data/ci.js',
  './data/idioms.js',
  './data/fables.js',
  './data/yijing.js',
  './data/laozi.js',
  './data/zhuangzi.js',
  './data/lunyu.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        return cached || fetch(event.request).then(function (response) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        if (cached) return cached;
        return fetch(event.request).then(function (response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        }).catch(function () {
          return cached;
        });
      })
    );
  }
});
