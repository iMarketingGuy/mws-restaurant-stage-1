// register service worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        // successful registration
        console.log('Successful ServiceWorker registration - scope: ', reg.scope);
      })
      .catch(err => {
        // failed registration
        console.log('ServiceWorker registration has failed: ', err);
      });
  });
}