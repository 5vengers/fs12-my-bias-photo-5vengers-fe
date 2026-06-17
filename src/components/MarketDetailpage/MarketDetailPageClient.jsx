'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import GradeText from '@/components/commons/Badge/GradeText';
import { useMarketItemDetail } from '@/hooks/useMarket';
import QuantityStepper from './QuantityStepper';

const DetailRow = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between text-[18px]">
      <span className="text-gray-300">{label}</span>
      <div className="font-bold text-white">{children}</div>
    </div>
  );
};

const MarketDetailPageClient = ({ itemId }) => {
  const [quantity, setQuantity] = useState(1);
  const { data: item, isPending, isError } = useMarketItemDetail(itemId);

  const remainingQuantity = item ? item.quantity - item.soldQuantity : 0;

  const totalPrice = useMemo(() => {
    if (!item) return 0;

    return item.pricePerCard * quantity;
  }, [item, quantity]);

  if (isPending) {
    return <main className="px-[220px] py-[80px] text-white">로딩 중...</main>;
  }

  if (isError || !item) {
    return (
      <main className="px-[220px] py-[80px] text-white">
        포토카드 정보를 불러오지 못했습니다.
      </main>
    );
  }

  const photoCard = item.myCard?.photoCard;
  const sellerNickname = item.seller?.nickname;

  return (
    <main className="min-h-screen bg-black px-[220px] pt-[36px] pb-[160px] text-white">
      <p className="font-baskin mb-[30px] text-[24px] text-gray-300">
        마켓플레이스
      </p>

      <p className="border-b border-gray-500 py-[30px] text-[16px] leading-[1.6] text-gray-200">
        {photoCard?.description || '등록된 설명이 없습니다.'}
      </p>

      <section className="mt-[60px] grid grid-cols-[minmax(0,2fr)_440px] gap-[60px]">
        <div className="relative aspect-[4/3] w-full bg-gray-500">
          {photoCard?.imageUrl ? (
            <Image
              src={photoCard.imageUrl}
              alt={photoCard.name || '포토카드 이미지'}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              이미지가 없습니다
            </div>
          )}
        </div>

        <aside>
          <div className="flex items-center justify-between border-b border-gray-400 pb-[30px]">
            <div className="flex items-center gap-[12px]">
              <GradeText grade={item.grade} />
              <span className="text-[24px] text-gray-400">|</span>
              <span className="text-[24px] font-bold text-gray-300">
                {photoCard?.genre}
              </span>
            </div>

            <span className="text-[24px] font-bold underline">
              {sellerNickname}
            </span>
          </div>

          <p className="border-b border-gray-500 py-[30px] text-[16px] leading-[1.6] text-gray-200">
            {photoCard?.description}
          </p>

          <div className="flex flex-col gap-[18px] border-b border-gray-500 py-[28px]">
            <DetailRow label="가격">{item.pricePerCard} P</DetailRow>
            <DetailRow label="잔여">
              {remainingQuantity} / {item.quantity}
            </DetailRow>
          </div>

          <div className="flex flex-col gap-[24px] py-[28px]">
            <div className="flex items-center justify-between">
              <span className="text-[18px] text-gray-300">구매수량</span>
              <QuantityStepper
                value={quantity}
                max={remainingQuantity}
                onChange={setQuantity}
              />
            </div>

            <DetailRow label="총 가격">
              {totalPrice} P
              <span className="ml-[4px] text-[14px] text-gray-300">
                ({quantity}장)
              </span>
            </DetailRow>
          </div>

          <button
            type="button"
            className="bg-main mt-[30px] flex h-[60px] w-full items-center justify-center rounded-[2px] text-[18px] font-bold text-black"
          >
            포토카드 구매하기
          </button>
        </aside>
      </section>
      <section className="mt-[80px]">
        <div className="flex items-center justify-between border-b border-gray-200 pb-[20px]">
          <h2 className="text-[32px] font-bold">교환 희망 정보</h2>

          <button
            type="button"
            className="bg-main h-[50px] w-[280px] rounded-[2px] text-[16px] font-bold text-black"
          >
            포토카드 교환하기
          </button>
        </div>

        <p className="mt-[40px] text-[18px] font-bold text-white">
          {item.wantedDescription}
        </p>

        <div className="mt-[20px] flex items-center gap-[12px]">
          <GradeText grade={item.wantedGrade} />
          <span className="text-gray-400">|</span>
          <span className="text-[18px] font-bold text-gray-300">
            {item.wantedGenre}
          </span>
        </div>
      </section>
    </main>
  );
};

export default MarketDetailPageClient;
