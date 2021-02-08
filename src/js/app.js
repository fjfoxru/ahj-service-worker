import News from './news';

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register(
        '/service.worker.js',
        { scope: './' },
      );
    } catch (e) {
      console.log(e);
    }
  });
}

const news = new News('fakseurl');
