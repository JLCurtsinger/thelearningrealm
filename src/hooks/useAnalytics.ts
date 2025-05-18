import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    const GA_MEASUREMENT_ID = 'G-MWWEBNPLXS';

    // Inject the GA script into the <head>
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Set up gtag function and dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    // Initialize GA
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }, []);
};
