'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/commons/Card/Card';
import { useMyCards } from '@/hooks/queries/useMarketItems';
import CloseIcon from '@/assets/icons/ic-close.svg';

// 교환 요청 모달 컴포넌트
const ExchangeRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending = false,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { data: myCards = [], isPending: isCardsPending } = useMyCards();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative flex h-[900px] w-[1160px] flex-col bg-black px-[80px] py-[60px]">
        {' '}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[60px] right-[60px] z-[60]"
        >
          <Image src={CloseIcon} alt="닫기" width={24} height={24} />
        </button>
        <h2 className="font-baskin border-b border-gray-400 pb-[30px] text-[46px] font-normal text-white">
          교환 제시하기
        </h2>
        <div className="mt-[40px] flex items-center justify-between">
          <h3 className="text-[24px] font-bold text-white">
            나의 포토카드 교환 목록
          </h3>
        </div>
        {isCardsPending ? (
          <div className="flex flex-1 items-center justify-center text-white">
            불러오는 중...
          </div>
        ) : (
          <div className="custom-scrollbar grid flex-1 grid-cols-2 gap-4 overflow-y-auto">
            {myCards.map((card) => (
              <button
                key={card.id}
                type="button"
                disabled={isPending}
                onClick={() => setSelectedCard(card)}
                className={`text-left disabled:opacity-50 ${
                  selectedCard?.id === card.id
                    ? 'outline-main outline outline-2'
                    : ''
                }`}
              >
                <Card>
                  <Card.Image src={card.imageUrl} alt={card.name} />
                  <Card.Title className="mt-5 mb-0">{card.name}</Card.Title>
                  <Card.InfoLayout>
                    <Card.Info nickname={card.nickname}>
                      <Card.Grade>{card.grade}</Card.Grade>
                      <span className="text-gray-300">{card.genre}</span>
                    </Card.Info>
                  </Card.InfoLayout>
                  <Card.SaleInfoLayout>
                    <Card.SaleInfo title="수량" count={card.quantity} />
                  </Card.SaleInfoLayout>
                </Card>
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedCard && (
        <section className="mt-[40px] border-t border-gray-400 pt-[30px]">
          <h3 className="mb-[20px] text-[24px] font-bold text-white">
            선택한 포토카드
          </h3>

          <div className="grid grid-cols-[240px_1fr] gap-[40px]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-[12px] text-white">
              <p className="text-[24px] font-bold">{selectedCard.name}</p>
              <p className="text-[18px] text-gray-300">
                {selectedCard.grade} | {selectedCard.genre}
              </p>
              <p className="text-[18px] text-gray-300">
                수량 {selectedCard.quantity}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ExchangeRequestModal;
