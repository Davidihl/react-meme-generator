// STORAGE OF BROWSER

const CACHE_NAME = 'version-1';
const urlsToCache = [
  'index.html',
  'offline.html',
  '../src/App.js',
  '../src/App.module.css',
  '../src/index.js',
  '../src/index.css',
  '../src/components/Form.js',
  '../src/components/Form.module.css',
  '../src/components/Meme.js',
  '../src/components/Meme.module.css',
  '../src/components/MemeHistory.js',
  '../src/components/MemeHistory.module.css',
];

// installation
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    }),
  );
});

// listen for request
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    }),
  );
});

// Activate the service worker
this.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          } else {
            return cacheName;
          }
        }),
      ),
    ),
  );
});
