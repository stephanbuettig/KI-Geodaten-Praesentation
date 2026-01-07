const CACHE_NAME = 'ki-geodaten-v1';

// Assets to precache on install
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './lib/d3.min.js',
    './lib/tailwind.min.js',
    './lib/lucide.min.js',
    './lib/fonts/inter.css',
    './lib/fonts/inter-300.ttf',
    './lib/fonts/inter-400.ttf',
    './lib/fonts/inter-500.ttf',
    './lib/fonts/inter-700.ttf',
    './data/avatar.jpg',
    // Backgrounds
    './data/1-0.png',
    './data/2-0.png',
    './data/3-0.png',
    './data/4-0.png',
    './data/5-0.png',
    './data/6-0.png',
    './data/7-0.png',
    // Card 1
    './data/1-1.svg',
    // Card 3 - AI Types
    './data/3-1.jpg',
    './data/3-2.jpg',
    './data/3-3.jpg',
    './data/3-4.jpg',
    './data/3-5.jpg',
    './data/3-6.jpg',
    './data/3-7.jpg',
    './data/3-8.jpg',
    // Card 4 - Feature Extraction
    './data/4-1.png',
    './data/4-2.png',
    './data/4-3.png',
    './data/4-4.png',
    './data/4-5.png',
    './data/4-6.png',
    // Card 5 - QGIS
    './data/5-1.gif',
    './data/5-2.mp4',
    './data/5-3.mp4',
    // Card 6 - LLMs
    './data/6-1.jpg',
    // Card 7 - Data
    './data/7-1.jpg',
    './data/7-2.jpg',
    './data/7-3.mp4',
    // Fallback
    './data/placeholder.svg'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching assets...');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[SW] Precaching complete!');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Precaching failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Claiming clients...');
                return self.clients.claim();
            })
    );
});

// Fetch event - Cache-First strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests (external APIs, CDNs)
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) {
        // For external requests, try network first, then cache
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Clone and cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Cache-First strategy for same-origin requests
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // If not in cache, fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // Clone and cache the response
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });

                        return response;
                    })
                    .catch(() => {
                        // If both cache and network fail, return offline fallback
                        console.log('[SW] Fetch failed for:', event.request.url);

                        // Check if it's an image request and return placeholder
                        if (event.request.destination === 'image' || event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
                            return caches.match('./data/placeholder.svg');
                        }

                        return new Response('Offline - Ressource nicht verfügbar', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain; charset=utf-8'
                            })
                        });
                    });
            })
    );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
