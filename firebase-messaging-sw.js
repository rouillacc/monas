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

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'AS Claudie Haigneré';
  const options = {
    body: payload.notification?.body || 'Nouvelle information disponible !',
    icon: './1000203112.jpg',
    badge: './1000203112.jpg'
  };
  self.registration.showNotification(title, options);
});
