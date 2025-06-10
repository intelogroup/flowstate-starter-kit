
import { useCallback, useMemo, useRef } from 'react';

// Debounce hook for search inputs
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
};

// Throttle hook for scroll events
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Memoized filter function
export const useFilteredData = <T>(
  data: T[],
  filters: Record<string, any>,
  filterFn: (item: T, filters: Record<string, any>) => boolean
) => {
  return useMemo(() => {
    return data.filter(item => filterFn(item, filters));
  }, [data, filters, filterFn]);
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = useRef(Date.now());

  return useCallback(() => {
    const duration = Date.now() - startTime.current;
    if (duration > 100) { // Log if render takes more than 100ms
      console.warn(`${componentName} render took ${duration}ms`);
    }
  }, [componentName]);
};
