// ─── Assignment Hub Service Worker ───────────────────────────────────────────
const CACHE_NAME = 'assignment-hub-v1';

// Files to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Google Fonts (cached on first fetch)
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap'
];

// ─── INSTALL: pre-cache core assets ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS.filter(url => !url.startsWith('https://fonts')));
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE: clear old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH: cache-first for app shell, network-first for fonts ───────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin except Google Fonts
  if (request.method !== 'GET') return;

  // Google Fonts — network first, fall back to cache
  if (url.hostname.includes('fonts.g')) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // App shell — cache first, fall back to network then offline page
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(res => {
          // Cache any new pages/assets fetched
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return res;
        }).catch(() => {
          // If offline and nothing cached, return index.html as fallback
          return caches.match('/index.html');
        });
      })
    );
    return;
  }
});

// ─── MESSAGE: force update ────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
