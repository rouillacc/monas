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

// Les fonctions Firebase envoient des messages data-only : une seule notification
// est donc affichée ici lorsque l’application est en arrière-plan.
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || 'AS Claudie Haigneré';
  const options = {
    body: data.body || 'Nouvelle information disponible !',
    icon: './1000203112.jpg',
    badge: './1000203112.jpg',
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
