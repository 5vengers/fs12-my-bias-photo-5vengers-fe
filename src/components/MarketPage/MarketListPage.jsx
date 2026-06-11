'use client';

import { useState, useEffect, useCallback } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Card from '../../components/commons/Card/Card';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import logoImage from '@/assets/images/img-logo.svg';
const MOCK_DATA = [
  {
    id: 1,
    title: '제니 미공포 Ktown4u',
    price: 25000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 2,
    title: '지수 보스턴 콘서트 현장포카',
    price: 18000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 3,
    title: '로제 R 솔로 앨범 한정판',
    price: 22000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 4,
    title: '리사 LALISA 골드 에디션',
    price: 30000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 5,
    title: '제니 Born Pink 팝업 포카',
    price: 45000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 6,
    title: '지수 ME 솔로 키트 포카',
    price: 15000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 7,
    title: '로제 시즌그리팅 홈마포카',
    price: 12000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 8,
    title: '리사 SG 영통 팬싸포카',
    price: 55000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 9,
    title: '블랙핑크 단체 더쇼 콘서트',
    price: 35000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 10,
    title: '제니 샤넬 앰버서더 기프트',
    price: 85000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 11,
    title: '지수 디올 뷰티 특별 한정',
    price: 40000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
  {
    id: 12,
    title: '로제 생로랑 방한 기념 포카',
    price: 28000,
    artist: 'BLACKPINK',
    imageUrl: '/testCard.jpg',
  },
];
export default function MarketListPage() {
  const fetchMarketItems = async ({ pageParam = 1 }) => {
    const LIMIT = 6;
    const startIndex = (pageParam - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;
    const slicedData = MOCK_DATA.slice(startIndex, endIndex);

    return {
      items: slicedData,
      nextPage: slicedData.length === LIMIT ? pageParam + 1 : undefined,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['marketItems'],
    queryFn: fetchMarketItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { observerRef } = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasMore: hasNextPage,
    onIntersect: fetchNextPage,
  });

  if (status === 'pending')
    return (
      <div className="p-[20px] text-white">첫 데이터를 불러오는 중...</div>
    );
  if (status === 'error')
    return (
      <div className="m-[20px] rounded-[4px] border border-red-500 bg-neutral-900 p-[20px] text-red-500">
        <h3 className="mb-[5px] font-bold">탠스택 쿼리 에러 발생:</h3>
        <p className="font-mono text-[14px]">
          {error?.message || '알 수 없는 에러'}
        </p>
      </div>
    );

  const allItems = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="mt-[70px]">
      <div className="grid grid-cols-3 gap-[80px]">
        {allItems.map((item) => (
          <Card key={item.id}>
            <Card.Image src={item.imageUrl} alt={'테스트이미지'} />
            <Card.Title className="mt-5 mb-[0px]">타이틀 테스트</Card.Title>
            <Card.InfoLayout>
              <Card.Info nickname={'닉네임'}>
                <Card.Grade>COMMON</Card.Grade>
                <span className="text-gray-300">장르</span>
              </Card.Info>
            </Card.InfoLayout>
            <Card.SaleInfoLayout>
              <Card.SaleInfo title={'가격'} type={'point'} count={7} />
              <Card.SaleInfo title={'수량'} count={1} />
            </Card.SaleInfoLayout>
            <div className="mt-[20px] flex items-center justify-center pt-[15px]">
              <Image src={logoImage} alt="브랜드 로고" width={99} height={18} />
            </div>
          </Card>
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
