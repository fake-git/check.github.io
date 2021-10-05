


// make sure that service worker supported
if('serviceWorker' in navigator){

    console.log('Service worker supported');

    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('./sw_chached_pages.js')
        .then(reg => console.log('Service worker REGISTERED'))
        .catch(err => console.log(`Error: ${err}`))
    });

}