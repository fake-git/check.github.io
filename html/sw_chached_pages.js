
const cacheName = 'v1';

// pages to cache
const cacheAssets = [
    'index.html',
    'about.html',
    '../css/style.css',
    '../js/main.js'
]





// Call to Install event
this.addEventListener('install', (e) => {
    
    console.log('Server Worker: INSTALLED');
    
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Server Worker: CACHED files');
            cache.addAll(cacheAssets)
        })
        .then(() => self.skipWaiting())
    )
});



// Call to Activate event
self.addEventListener('activate', (e) => {

    console.log('Server Worker: ACTIVATED');

    // Remove unwanted caches (v1 & v2)
    e.waitUntil(
        caches.keys()
        .then(all_cache_names => {
            return Promise.all(
                all_cache_names.map(cache =>{
                    if(cache !== cacheName)  // if(cache !== 'v1')
                    {
                        console.log('Service Worker: Old Cache Cleared!');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );

});



// Call Fetch event
self.addEventListener('fetch', (e) => {

    console.log('Service Worker: Fetching');

    // apparently, when the erver will get some request
    // when he ofline, we will check the 'caches' if can 
    // give as respond one of the caches that we saved
    e.respondWith( 
        fetch(e.request)
        .catch(() => caches.match(e.request)) 
    )
})


