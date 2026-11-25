importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCmV2E6dhnXPDNjjMkVQHI8IH2nXKQByvc",
  authDomain: "appel-as.firebaseapp.com",
  projectId: "appel-as",
  storageBucket: "appel-as.firebasestorage.app",
  messagingSenderId: "943879688117",
  appId: "1:943879688117:web:0ddb0d3ce3801b07ff13fc"
});

const messaging = firebase.messaging();

// Activation immédiate du Service Worker et validation des critères d'installation PWA
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Écouteur fetch requis par Chrome/Android pour proposer l'installation sur l'écran d'accueil
self.addEventListener('fetch', () => {});

// Les fonctions Firebase envoient des messages data-only : une seule notification
// est affichée ici lorsque l’application est en arrière-plan.
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || 'AS Claudie Haigneré';
  const options = {
    body: data.body || 'Nouvelle information disponible !',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || './' }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || './', self.registration.scope).href;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windows) {
      if ('focus' in client) {
        await client.focus();
        if ('navigate' in client) await client.navigate(targetUrl);
        return;
      }
    }
    if (clients.openWindow) await clients.openWindow(targetUrl);
  })());
});
