import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({ loading, hasMore, onIntersect }) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    const currentTarget = observerRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },

      { threshold: 0.2 },
    );

    observer.observe(currentTarget);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore, onIntersect]);

  return { observerRef };
}
