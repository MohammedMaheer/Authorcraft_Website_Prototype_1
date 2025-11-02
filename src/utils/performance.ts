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

  // Measure Core Web Vitals using dynamic import
  const initWebVitals = async () => {
    try {
      const webVitals = await import('web-vitals');
      
      // Modern web-vitals API (v4+)
      if (webVitals.onCLS) webVitals.onCLS(reportWebVitals);
      if (webVitals.onFCP) webVitals.onFCP(reportWebVitals);
      if (webVitals.onLCP) webVitals.onLCP(reportWebVitals);
      if (webVitals.onINP) webVitals.onINP(reportWebVitals); // INP replaces FID in modern API
    } catch (err) {
      console.warn('Web Vitals not available');
    }
  };

  // Initialize on load
  if (typeof window !== 'undefined' && window.requestIdleCallback) {
    window.requestIdleCallback(() => initWebVitals());
  } else if (typeof window !== 'undefined') {
    setTimeout(() => initWebVitals(), 2000);
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
export const optimizeImage = (src: string, width: number) => {
  return {
    src,
    srcSet: `${src}?w=${width * 1} 1x, ${src}?w=${width * 2} 2x`,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
};

// Debounce utility for scroll/resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// RequestAnimationFrame throttle
export const throttleRAF = <T extends (...args: any[]) => any>(
  func: T
) => {
  let rafId: number;
  return (...args: Parameters<T>) => {
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
