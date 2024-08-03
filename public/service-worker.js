const CACHE_NAME = 'my-cache-v1';
const URLs_TO_CACHE = [
  '/',
  '/movie',
  '/offline.html', // Ensure this is a valid path in your `public` directory
];

// Install event - Cache necessary resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLs_TO_CACHE);
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error);
      })
  );
});

// Activate event - Clean up old caches if necessary
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Serve cached resources or fallback to offline page
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).catch(() => {
          // Return offline page if the network request fails
          return caches.match('/offline.html');
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Optionally return a fallback response here if needed
        return new Response('Service Worker: Fetch error', {
          status: 500,
          statusText: 'Fetch error',
        });
      })
  );
});
