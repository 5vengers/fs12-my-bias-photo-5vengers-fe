import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({ loading, hasMore, onIntersect }) {
  const observerRef = useRef(null);

  useEffect(() => {
    // 로딩 중이거나 더 가져올 데이터가 없다면 관찰하지 않음
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 탐지기가 포착되면 부모가 넘겨준 함수(onIntersect) 실행
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // 언마운트 시 관찰 해제 (메모리 누수 방지)
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore, onIntersect]);

  return { observerRef };
}
