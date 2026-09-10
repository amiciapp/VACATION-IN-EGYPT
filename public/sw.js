const CACHE_NAME = 'vacation-egypt-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/logo.jpg',
  '/manifest.json',
  '/images/hero-redsea.jpg'
];

// Install: cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: strategy by request type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache-First for static assets (JS/CSS/images/fonts) — NOT videos (too large)
  if (
    url.pathname.match(/\.(js|css|woff2?|svg|png|jpg|jpeg|webp|avif|ico)$/) ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/images/')
    // Note: /videos/ intentionally excluded — files are 50MB+, caching would exhaust device storage
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Network-First for HTML/document and API requests
  if (request.mode === 'navigate' || url.pathname.match(/\.(html)$/)) {
    event.respondWith(
      fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      }).catch(() => {
        return caches.match(request).then((cached) => {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate for everything else
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// Push Notifications
self.addEventListener('push', (event) => {
  let data = { title: 'VACATION IN EGYPT', body: 'Flash Deal: 20% off Red Sea Yacht Charters!' };
  if (event.data) {
    try { data = event.data.json(); } catch { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'VACATION IN EGYPT', {
      body: data.body,
      icon: '/logo.jpg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
      data: { dateOfArrival: Date.now() },
      actions: [
        { action: 'explore', title: 'View Deal' },
        { action: 'close', title: 'Close' }
      ]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});
