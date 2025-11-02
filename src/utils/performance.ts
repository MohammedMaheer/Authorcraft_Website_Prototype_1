// Performance optimization utilities

export const usePerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Report Web Vitals
  const reportWebVitals = (metric: any) => {
    console.log(`${metric.name}:`, metric.value);
    
    // Send to analytics
    if (navigator.sendBeacon) {
      const data = JSON.stringify(metric);
      navigator.sendBeacon('/api/vitals', data);
    }
  };

  // Measure Core Web Vitals
  if ('web-vital' in window) {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');
    
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  }

  // Intersection Observer for lazy loading
  const observeElements = (selector: string, callback: IntersectionObserverCallback) => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
    });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return observer;
  };

  return { reportWebVitals, observeElements };
};

// Image optimization utility
export const optimizeImage = (src: string, width: number, height: number) => {
  return {
    src,
    srcSet: `${src}?w=${width * 1} 1x, ${src}?w=${width * 2} 2x`,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
};

// Debounce utility for scroll/resize events
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// RequestAnimationFrame throttle
export const throttleRAF = (func: Function) => {
  let rafId: number;
  return (...args: any[]) => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => func(...args));
  };
};

// Preload resources
export const preloadResource = (url: string, as: 'script' | 'style' | 'image' | 'font') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = url;
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
};

// Prefetch resources
export const prefetchResource = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

// DNS prefetch for external domains
export const dnsPrefetch = (domain: string) => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = `//${domain}`;
  document.head.appendChild(link);
};
