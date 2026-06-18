'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GradeText from '@/components/commons/Badge/GradeText';
import {
  useCreateExchangeProposal,
  useMarketItemDetail,
  usePurchaseMarketItem,
} from '@/hooks/useMarket';
import QuantityStepper from './QuantityStepper';
import ExchangeRequestModal from './ExchangeRequestModal';

const DetailRow = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between text-[18px]">
      <span className="text-gray-300">{label}</span>
      <div className="font-bold text-white">{children}</div>
    </div>
  );
};

const MarketDetailPageClient = ({ itemId }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);

  const { mutate: createExchangeProposal, isPending: isExchangePending } =
    useCreateExchangeProposal();
  const { data: item, isPending, isError } = useMarketItemDetail(itemId);
  const { mutate: purchaseMarketItem, isPending: isPurchasePending } =
    usePurchaseMarketItem();

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

  const remainingQuantity = item.quantity - item.soldQuantity;

  const totalPrice = item.pricePerCard * quantity;

  // 구매 버튼 클릭 시 호출되는 함수
  const handlePurchase = () => {
    if (isPurchasePending) return;
    if (quantity < 1 || quantity > remainingQuantity) return;

    purchaseMarketItem(
      {
        itemId,
        quantity,
      },
      {
        onSuccess: () => {
          router.push('/result?domain=card&type=buy&status=success');
        },
        onError: () => {
          router.push('/result?domain=card&type=buy&status=fail');
        },
      },
    );
  };

  // 교환 제안 제출 시 호출되는 함수
  const handleExchangeSubmit = (offeredCardId) => {
    createExchangeProposal(
      {
        itemId,
        offeredCardId,
      },
      {
        onSuccess: () => {
          setIsExchangeModalOpen(false);
          router.push('/result?domain=card&type=exchange&status=success');
        },
        onError: () => {
          setIsExchangeModalOpen(false);
          router.push('/result?domain=card&type=exchange&status=fail');
        },
      },
    );
  };

  return (
    <main className="min-h-screen bg-black px-[220px] pt-[36px] pb-[160px] text-white">
      <p className="font-baskin mb-[30px] text-[24px] text-gray-300">
        마켓플레이스
      </p>

      <h1 className="font-baskin border-b border-gray-200 pb-[20px] text-[46px] font-normal">
        {item.title || '포토카드 상세'}
      </h1>

      <section className="mt-[60px] grid grid-cols-[minmax(0,2fr)_440px] gap-[60px]">
        <div className="relative aspect-[4/3] w-full bg-gray-500">
          {item?.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title || '포토카드 이미지'}
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
                {item.genre}
              </span>
            </div>

            <span className="text-[24px] font-bold underline">
              {item.sellerNickname}
            </span>
          </div>

          <p className="border-b border-gray-500 py-[30px] text-[16px] leading-[1.6] text-gray-200">
            {item.description}
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
            onClick={handlePurchase}
            disabled={
              isPurchasePending ||
              remainingQuantity < 1 ||
              quantity < 1 ||
              quantity > remainingQuantity
            }
            className="bg-main mt-[30px] flex h-[60px] w-full items-center justify-center rounded-[2px] text-[18px] font-bold text-black disabled:bg-gray-400 disabled:text-gray-300"
          >
            {isPurchasePending ? '구매 중...' : '포토카드 구매하기'}
          </button>
        </aside>
      </section>
      <section className="mt-[80px]">
        <div className="flex items-center justify-between border-b border-gray-200 pb-[20px]">
          <h2 className="text-[32px] font-bold">교환 희망 정보</h2>

          <button
            type="button"
            onClick={() => setIsExchangeModalOpen(true)}
            disabled={isExchangePending}
            className="bg-main h-[50px] w-[280px] rounded-[2px] text-[16px] font-bold text-black disabled:bg-gray-400 disabled:text-gray-300"
          >
            {isExchangePending ? '교환 요청 중...' : '포토카드 교환하기'}
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
      <ExchangeRequestModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        onSubmit={handleExchangeSubmit}
        isPending={isExchangePending}
      />
    </main>
  );
};

export default MarketDetailPageClient;
