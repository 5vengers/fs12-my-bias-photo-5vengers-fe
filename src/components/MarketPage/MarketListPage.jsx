'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import MarketCard from './MarketCard';
import { useMarketItems } from '@/hooks/queries/useMarketItems';

export default function MarketListPage(grade, genre, soldOut, sort) {
  const {
    allItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useMarketItems();

  const { observerRef } = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasMore: hasNextPage,
    onIntersect: fetchNextPage,
  });
  if (isPending)
    return (
      <div className="p-[20px] text-white">첫 데이터를 불러오는 중...</div>
    );
  if (isError) {
    console.error(error);

    return (
      <div className="m-[20px] rounded-[4px] border border-red-500 bg-neutral-900 p-[20px] text-red-500">
        <h3 className="mb-[5px] font-bold">데이터를 불러오지 못했습니다.</h3>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="mt-[70px]">
      <div className="grid grid-cols-3 gap-[80px]">
        {allItems.map((item) => (
          <MarketCard key={item.id} item={item} />
        ))}
      </div>

      <div
        ref={observerRef}
        className="mt-[50px] flex h-[40px] w-full items-center justify-center text-[14px] text-gray-400"
      >
        {isFetchingNextPage && <p>로딩중...</p>}
        {!hasNextPage && (
          <p className="font-medium text-gray-500"> 마지막 상품입니다.</p>
        )}
      </div>
    </div>
  );
}
