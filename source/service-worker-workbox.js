importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {

    var CACHE_NAME = 'geshan-blog-pwa';

    // Configure Workbox
    workbox.setConfig({
        debug: true
    });

    // Configure Workbox Caching
    workbox.core.setCacheNameDetails({
        prefix: CACHE_NAME,
        suffix: 'v1',
    });

    // Set skip waiting and clients claims as per Workbox Codelabs
    workbox.skipWaiting();
    workbox.clientsClaim();


    /*****************
     * Pre-Cache Files
     *****************/

    workbox.precaching.precacheAndRoute([
        '/',
        '/images/rss.png',
        '/assets/bootstrap/dist/css/bootstrap.united.min.css',
        '/stylesheets/screen.css',
        '/assets/bootstrap/dist/js/bootstrap.min.js',
        '/javascripts/modernizr-2.0.js'        
    ]);


    /*******************************
     * Cache CSS using Network First
     *******************************/

    workbox.routing.registerRoute(
        /.*\.css/,

        workbox.strategies.networkFirst()
    );


    /******************************
     * Cache JS using Network First
     ******************************/

    workbox.routing.registerRoute(
        /.*\.js/,

        workbox.strategies.networkFirst()
    );


    /********************************
     * Cache Images using Cache First
     ********************************/

    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif)/,

        // Use the cache if it's available
        workbox.strategies.cacheFirst({

            // Use a custom cache name
            cacheName: CACHE_NAME + '-image-cache',

            plugins: [
                new workbox.expiration.Plugin({

                    // Don't keep any entries for more than 3 days.
                    maxAgeSeconds: 3 * 24 * 60 * 60,

                    // Automatically cleanup if quota is exceeded.
                    purgeOnQuotaError: true,

                    // Note: Status code '0' is used for opaque responses
                    statuses: [0, 200]
                })
            ],
        })
    );


    /*********************************
     * Custom Matcher/Handler for HTML
     *
     * @param url
     * @param event
     * @param params
     * @returns {boolean}
     ********************************/

    var matcher = function({url, event, params}) {
        var isNavigating = event.request.mode === "navigate";
        var isHTML = event.request.headers.get("accept").includes("text/html");
        var isLocal = url.origin === location.origin;

        return isNavigating && isHTML && isLocal;
    };

    var handler = function({event}) {
        return workbox.strategies
            .networkFirst({

                // Use a custom cache name
                cacheName: CACHE_NAME + '-html-cache',

                plugins: [
                    new workbox.cacheableResponse.Plugin({

                        // Keep at most recent entries
                        maxEntries: 240,

                        // Don't keep any entries for more than 3 days.
                        maxAgeSeconds: 3 * 24 * 60 * 60,

                        // Automatically cleanup if quota is exceeded.
                        purgeOnQuotaError: true,

                        // Note: Status code '0' is used for opaque responses
                        statuses: [0, 200]
                    })
                ],
            })
            .handle({event})
            .then(function (response) {
                return response ? response : fromCache(precacheCacheName, event.request);
            })
            .catch(function() {
                return fromCache(precacheCacheName, event.request)
            });
    };

    workbox.routing.registerRoute(matcher, handler);
}
