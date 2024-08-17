import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface useIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const observerCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          console.log('Fetching next page...');
          fetchNextPage().catch((err) =>
            console.error('Error fetching next page:', err),
          );
        }
      });
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCallback, target, threshold]);

  return { setTarget };
};
