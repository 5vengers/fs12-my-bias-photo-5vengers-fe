'use client';

import { useState } from 'react';
import Image from 'next/image';
import GradeText from '@/components/commons/Badge/GradeText';
import { GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/marketOptions';
import { useUpdateMarketItem } from '@/hooks/useMarket';

const MarketEditModal = ({ isOpen, onClose, item, itemId }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [pricePerCard, setPricePerCard] = useState(item.pricePerCard);
  const [wantedGrade, setWantedGrade] = useState(item.wantedGrade ?? '');
  const [wantedGenre, setWantedGenre] = useState(item.wantedGenre ?? '');
  const [wantedDescription, setWantedDescription] = useState(
    item.wantedDescription ?? '',
  );

  const { mutate: updateMarketItem, isPending } = useUpdateMarketItem();

  if (!isOpen) return null;

  const minQuantity = Math.max(item.soldQuantity, 1);

  // 총 판매 수량은 이미 판매된 수량보다 작게 수정할 수 없습니다.
  const handleDecreaseQuantity = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 수정하기 버튼을 누르면 변경된 판매 정보와 교환 희망 정보를 서버에 저장합니다.
  const handleSubmit = () => {
    if (isPending) return;
    if (quantity < minQuantity) return;
    if (Number(pricePerCard) < 1) return;

    updateMarketItem(
      {
        itemId,
        data: {
          quantity,
          pricePerCard: Number(pricePerCard),
          wantedGrade,
          wantedGenre,
          wantedDescription,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-[920px] bg-gray-500 px-[60px] py-[48px] text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[28px] right-[28px] text-[28px] text-gray-300"
        >
          ×
        </button>

        <p className="mb-[22px] text-[18px] font-bold text-gray-300">
          수정하기
        </p>

        <h2 className="font-baskin border-b border-gray-300 pb-[20px] text-[36px] font-normal">
          {item.title}
        </h2>

        <section className="mt-[28px] grid grid-cols-[360px_1fr] gap-[36px]">
          <div className="relative h-[270px] w-[360px] bg-gray-400">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="360px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-300">
                이미지가 없습니다
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-gray-400 pb-[22px]">
              <div className="flex items-center gap-[10px]">
                <GradeText grade={item.grade} />
                <span className="text-gray-400">|</span>
                <span className="font-bold text-gray-300">{item.genre}</span>
              </div>

              <span className="font-bold underline">{item.sellerNickname}</span>
            </div>

            <div className="mt-[28px] flex items-center justify-between">
              <span className="text-[16px] text-gray-300">총 판매 수량</span>

              <div className="flex items-center gap-[12px]">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= minQuantity}
                  className="flex h-[36px] w-[36px] items-center justify-center border border-gray-400 text-[20px] disabled:opacity-30"
                >
                  -
                </button>

                <span className="min-w-[32px] text-center text-[16px] font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="flex h-[36px] w-[36px] items-center justify-center border border-gray-400 text-[20px]"
                >
                  +
                </button>

                <span className="text-[14px] text-gray-300">
                  / {item.quantity}장
                </span>
              </div>
            </div>

            <label className="mt-[20px] flex items-center justify-between">
              <span className="text-[16px] text-gray-300">장당 가격</span>

              <div className="flex h-[40px] w-[180px] items-center border border-gray-400 px-[12px]">
                <input
                  type="number"
                  min="1"
                  value={pricePerCard}
                  onChange={(event) => setPricePerCard(event.target.value)}
                  className="w-full bg-transparent text-right text-white outline-none"
                />
                <span className="ml-[8px] font-bold text-white">P</span>
              </div>
            </label>
          </div>
        </section>

        <section className="mt-[44px]">
          <h3 className="border-b border-gray-300 pb-[16px] text-[22px] font-bold">
            교환 희망 정보
          </h3>

          <div className="mt-[24px] grid grid-cols-2 gap-[24px]">
            <label>
              <span className="mb-[10px] block text-[14px] text-gray-300">
                등급
              </span>
              <select
                value={wantedGrade}
                onChange={(event) => setWantedGrade(event.target.value)}
                className="h-[44px] w-full border border-gray-400 bg-gray-500 px-[14px] text-white outline-none"
              >
                {GRADE_OPTIONS.filter((option) => option.value).map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              <span className="mb-[10px] block text-[14px] text-gray-300">
                장르
              </span>
              <select
                value={wantedGenre}
                onChange={(event) => setWantedGenre(event.target.value)}
                className="h-[44px] w-full border border-gray-400 bg-gray-500 px-[14px] text-white outline-none"
              >
                {GENRE_OPTIONS.filter((option) => option.value).map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          <label className="mt-[24px] block">
            <span className="mb-[10px] block text-[14px] text-gray-300">
              교환 희망 설명
            </span>
            <textarea
              value={wantedDescription}
              onChange={(event) => setWantedDescription(event.target.value)}
              className="h-[110px] w-full resize-none border border-gray-400 bg-gray-500 p-[14px] text-white outline-none"
            />
          </label>
        </section>

        <div className="mt-[36px] grid grid-cols-2 gap-[12px]">
          <button
            type="button"
            onClick={onClose}
            className="h-[56px] border border-gray-300 text-[16px] font-bold text-white"
          >
            취소하기
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || quantity < minQuantity}
            className="bg-main h-[56px] text-[16px] font-bold text-black disabled:bg-gray-400"
          >
            {isPending ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketEditModal;
