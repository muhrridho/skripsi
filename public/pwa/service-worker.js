var dataCacheName = 'skripsi-pwa-v1';
var cacheName = 'skripsi-pwa-content';
var filesToCache = [
  'index.html',
  // Stylesheets
  '../../styles/style.css',
  '../../library/owlcarousel/assets/owl.carousel.css',
  '../../library/responsive-tabs/css/responsive-tabs.css',

  // Scripts
  '../../scripts/script.js',

  // Images
  '../../images/image-small-1.jpg',

  // Media

  //  PWA
  'app.js'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  // console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      // console.log(caches);
      // console.log(e.request);
      if(response){
        console.log(' Found response in cache:', response);
        return response;
      } else return fetch(e.request)
      // return response || fetch(e.request);
    })
  );
  
});

// self.addEventListener('fetch', (event) => {
//   console.info('Event: Fetch');

//   var request = event.request;

//   //Tell the browser to wait for newtwork request and respond with below
//   event.respondWith(
//     //If request is already in cache, return it
//     caches.match(request).then((response) => {
//       if (response) {
//         return response;
//       }

//       //if request is not cached, add it to cache
//       return fetch(request).then((response) => {
//         var responseToCache = response.clone();
//         // caches.open(cacheName).then((cache) => {
//         //     cache.put(request, responseToCache).catch((err) => {
//         //       console.warn(request.url + ': ' + err.message);
//         //     });
//         //   });

//         return response;
//       });
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   console.log('Handling fetch event for', event.request.url);

//   event.respondWith(
    
//     // Opens Cache objects that start with 'font'.
//     caches.open(CURRENT_CACHES['font']).then(function(cache) {
//       return cache.match(event.request).then(function(response) {
//         if (response) {
//           console.log(' Found response in cache:', response);

//           return response;
//         } 
//       }).catch(function(error) {
        
//         // Handles exceptions that arise from match() or fetch().
//         console.error('  Error in fetch handler:', error);

//         throw error;
//       });
//     })
//   );
// });







// self.addEventListener('install', function(e) {
//   console.log('[ServiceWorker] Install');
//   e.waitUntil(
//     caches.open(cacheName)
//       .then((cache) => {
//         console.log('[ServiceWorker] Caching app shell');
//         return cache.addAll(filesToCache);
//         // .then(() => {
//         //   console.info('[ServiceWorker] All files are cached');
//         //   return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
//         // })
//         // .catch((error) => {
//         //   console.error('[ServiceWorker] Failed to cache', error);
//         // })
//     })
//   );
// });

// self.addEventListener('activate', function(e) {
//   console.log('[ServiceWorker] Activate');
//   e.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(keyList.map(function(key) {
//         if (key !== cacheName && key !== dataCacheName) {
//           console.log('[ServiceWorker] Removing old cache', key);
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
//   return self.clients.claim();
// });

// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request)
//     .then((response) => {
//       if (response) {
//         return response;
//       }
//       // console.log(e.request)
//       console.log(response);
//       // console.log(e.request);
//       return fetch(e.request);
//       // return response || fetch(e.request);
//     })

//     .catch((error) => {
//       console.error('[ServiceWorker] Failed to fetch', error);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   console.info('[ServiceWorker] Fetching..');

//   var request = event.request;

//   //Tell the browser to wait for newtwork request and respond with below
//   event.respondWith(
//     //If request is already in cache, return it
//     caches.match(request).then((response) => {
//       // if (response) {
//       //   return response;
//       // }

//       return response || fetch(request);

//       //if request is not cached, add it to cache
//       // return fetch(request).then((response) => {
//       //   // console.log("re-cacheing")
//       //   // var responseToCache = response.clone();
//       //   // caches.open(cacheName).then((cache) => {
//       //   //   cache.put(request, responseToCache).catch((err) => {
//       //   //     console.warn(request.url + ': ' + err.message);
//       //   //   });
//       //   // });

//       //   return response;
//       // });
//     })
//   );
// });