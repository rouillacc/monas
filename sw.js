// Un Service Worker minimal pour valider les critères d'installation PWA de Google
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    // Laisse les requêtes passer normalement
});
