/******************************
 * Service Worker Configuration
 ******************************/

var CACHE_NAME = 'geshan-blog-pwa-v1';

var FILES_TO_PRECACHE = [
    '/',
    '/images/rss.png',
    '/assets/bootstrap/dist/css/bootstrap.united.min.css',
    '/stylesheets/screen.css',
    '/assets/bootstrap/dist/js/bootstrap.min.js',
    '/javascripts/modernizr-2.0.js'
];


/***********************************
 * Service Worker Strategies
 ***********************************/

/**
 * Pre-Cache
 * @ref https://serviceworke.rs/
 * @returns {Promise<void>}
 */
function precache() {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(FILES_TO_PRECACHE);
    });
}

/**
 * Fetch Image or Network
 * @ref https://frontendmasters.com/courses/progressive-web-apps/defining-pwa/
 * @ref https://github.com/mike-works/pwa-fundamentals/blob/femasters/13-complete/client/sw.js
 * @param event
 * @returns {Promise<any>}
 */
function fetchImageOrNetwork(event) {
    return fetch(event.request, {mode: 'cors'})
        .then((response) => {
            let responseClone = response.clone();

            if (!response.ok) {
                return fromNetwork(event.request, 400);
            }

            caches.open(CACHE_NAME).then(cache => {
                if (response.ok) {

                    // Begin the process of adding the response to the cache
                    cache.put(event.request, responseClone);
                }
            });

            return response;
        })
        .catch(() => {
            return caches.match(event.request, {cacheName: CACHE_NAME})
                .then(response => {
                    return response || fromNetwork(event.request, 400);
                });
        })
}

/**
 * From Cache
 * @ref https://serviceworke.rs/
 * @param event
 * @returns {Promise<Response>}
 */

function fromCache(event) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (matching) {
            return matching || fromNetwork(event);
        });
    });
}

/**
 * From Network
 * @ref https://serviceworke.rs/
 * @param event
 * @param timeout
 * @returns {Promise<any>}
 */

function fromNetwork(event, timeout) {
    return new Promise(function (fulfill, reject) {
        var timeoutId = setTimeout(reject, timeout);

        fetch(event.request, {mode: 'cors'})
            .then(function (response) {
                clearTimeout(timeoutId);
                fulfill(response);
            }, reject);
    });
}

/**************************
 * Service Worker Lifecycle
 **************************/

self.addEventListener('install', function (event) {
    console.log('Service worker install');

    // Pre-cache files
    event.waitUntil(precache());
});

self.addEventListener('activate', function (event) {
    console.log('Service worker activate');

    // Clean up old caches when the service worker changes
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_NAME) {
                    console.log('Service worker removing old cache', key);

                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    // console.log('Service worker fetch', event.request.url);

    // Helpers for various request types
    let acceptHeader = event.request.headers.get('accept');
    let requestUrl = new URL(event.request.url);

    let isFromApi = requestUrl.origin.indexOf('localhost:3100') >= 0;
    let isGetRequest = event.request.method;

    let isLocal = new URL(event.request.url).origin === location.origin;
    let isImage = acceptHeader.indexOf('image/*') >= 0 && requestUrl.pathname.indexOf('/images/') === 0;
    let isHtml = event.request.headers.get('accept').indexOf('text/html') !== -1;
    let isJs = /.*(json)$/.test(event.request.url);

    // Handle fetch requests using different strategies
    event.respondWith(
        caches.match(event.request, {cacheName: CACHE_NAME})
            .then(response => {

                // Check whether request is other than local
                if (!isLocal) {
                    return fetch(event.request);

                // Check whether the request was found in the cache
                } else if (response) {
                    return response;

                // Check for local HTML such as the homepage
                } else if (isLocal && isHtml) {

                    // Try getting the HTML from network first
                    // And if that fails, try the cache
                    return fromNetwork(event, 400)
                        .catch(function () {
                            return fromCache(event);
                        })

                // Check whether the request is an image
                } else if (acceptHeader && isImage) {

                    // Try getting the image
                    // And if that fails, try the network
                    return fetchImageOrNetwork(event)

                // For everything else, try the network
                } else {
                    return fromNetwork(event, 400);
                }
            })
    );
});
