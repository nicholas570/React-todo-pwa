/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// these two lines ensure that service worker gets installed in all open clients right away
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// 1. the install install and activater events, allow us to execute code when PWA get's installed for the first time

// self.addEventListener("install", event => {
//   const asyncInstall = new Promise(resolve => {
//     console.log("Waiting to resolve...");
//     setTimeout(resolve, 5000);
//   });

//   event.waitUntil(asyncInstall);
// });

// self.addEventListener("activate", event => {
//   console.log("activate");
// });

// 2. Caching third party resources from a CDN

// workbox.routing.registerRoute(
//   new RegExp("https:.*min.(css|js)"),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: "cdn-cache"
//   })
// );

// 3. Caching JSON data (this is for any JSON network call from the backend server)
// we matched the entire local host URL. But in production, that might be /*.json, for example, depending on how we call it from our application

// workbox.routing.registerRoute(
//   new RegExp("http://.*:4567.*.json"),
//   workbox.strategies.networkFirst()
// );

// 4. Show an error when a POST or DELETE request fails offline

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST' || event.request.method === 'DELETE') {
    event.respondWith(
      fetch(event.request).catch((err) => {
        return new Response(
          JSON.stringify({
            error: 'This action is disabled while app is offline',
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      })
    );
  }
});

// 5. Push notifications

self.addEventListener('push', (event) => {
  event.waitUntil(
    self.registration.showNotification('Todo List', {
      icon: '/icon-120.png',
      body: event.data.text(),
    })
  );
});

/* This uses the list of files from __precacheManifest, which is automatically generated by the
inject manifest webpack plugin and caches those files at the correct route */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
