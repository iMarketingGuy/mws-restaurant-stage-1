var CACHE_ID = 'mws-restaurant-stage1-v1';
var urlsToCache = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/js/',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/register.js',
	'/js/restaurant_info.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
	caches.open(CACHE_ID)
	  .then(cache => {
		console.log('Opened cache');
		return cache.addAll(urlsToCache);
	  })
	  .catch(error => {
		console.log('Caches failed to open: ', error);
	  })
  );
});

/* google */
/*
self.addEventListener('fetch', event => {
  event.respondWith(
  	caches.match(event.request)
  	  .then(response => {
  	    if (response) {
  	  	  return response;
  	    }

  	    let fetchRequest = event.request.clone();

  	    return fetch(fetchRequest).then(
  	  	  function(response) {
  	  	    if(!response || response.status !== 200 || response.type !== 'basic') {
  	  	  	  return response;
  	  	    }

  	  	    var responseToCache = response.clone();

  	  	    caches.open(CACHE_ID)
  	  	      .then(cache => {
  	  	        cache.put(event.request, responseToCache);
  	  	      });

  	  	    return response;
          }
        );
      })
    );
});
*/

/* moz */
// produces errors from chrome extensions
self.addEventListener('fetch', event => {
  event.respondWith(
	caches.match(event.request)
	  .then(resp => {
	  	return resp || fetch(event.request)
	  	  .then(response => {
	  	  	let responseClone = response.clone();
	  	  	caches.open(CACHE_ID)
	  	  	  .then(cache => {
	  	  	  	cache.put(event.request, responseClone);
	  	  	  });

	  	  	  return response;
	  	  });
	  })
	  .catch(function() {
	  	return caches.match('img/na.jpg');
	  })
  );
});
