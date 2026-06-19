'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GradeText from '@/components/commons/Badge/GradeText';
import {
  useApproveExchangeProposal,
  useDeleteMarketItem,
  useReceivedExchangeProposals,
  useRejectExchangeProposal,
} from '@/hooks/useMarket';
import ExchangeProposalCard from './ExchangeProposalCard';
import MarketEditModal from './MarketEditModal';
import ExchangeIcon from '@/assets/icons/ic-exchange.svg';
import { GENRE_OPTIONS } from '@/constants/marketOptions';

const DetailRow = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between text-[18px]">
      <span className="text-gray-300">{label}</span>
      <div className="font-bold text-white">{children}</div>
    </div>
  );
};

const SellerMarketDetailPage = ({ item, itemId }) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: receivedExchangeProposals = [], isPending } =
    useReceivedExchangeProposals();

  const { mutate: approveExchangeProposal, isPending: isApprovePending } =
    useApproveExchangeProposal();

  const { mutate: rejectExchangeProposal, isPending: isRejectPending } =
    useRejectExchangeProposal();

  const { mutate: deleteMarketItem, isPending: isDeletePending } =
    useDeleteMarketItem();

  const remainingQuantity = item.quantity - item.soldQuantity;

  // 받은 전체 교환 제시 중 현재 판매글에 해당하는 WAITING 상태만 보여줍니다.
  const waitingExchangeProposals = receivedExchangeProposals.filter(
    (proposal) =>
      proposal.marketItemId === item.id && proposal.status === 'WAITING',
  );

  // 판매자가 교환 제시를 승인할 때 실행합니다.
  const handleApproveExchange = (exchangeId) => {
    approveExchangeProposal(exchangeId);
  };

  // 판매자가 교환 제시를 거절할 때 실행합니다.
  const handleRejectExchange = (exchangeId) => {
    rejectExchangeProposal(exchangeId);
  };

  // 판매자가 판매글을 내릴 때 실행합니다.
  const handleDeleteMarketItem = () => {
    if (isDeletePending) return;
    if (!window.confirm('판매를 내리시겠습니까?')) return;

    deleteMarketItem(itemId, {
      onSuccess: () => {
        router.push('/market');
      },
    });
  };

  // 장르 값을 받아서 라벨을 반환
  const getGenreLabel = (genre) =>
    GENRE_OPTIONS.find((option) => option.value === genre)?.label ?? genre;

  return (
    <main className="min-h-screen bg-black px-[220px] pt-[36px] pb-[160px] text-white">
      <p className="font-baskin mb-[30px] text-[24px] text-gray-300">
        마켓플레이스
      </p>

      <h1 className="font-baskin border-b border-gray-200 pb-[20px] text-[46px] font-normal">
        {item.title}
      </h1>

      <section className="mt-[60px] grid grid-cols-[minmax(0,2fr)_440px] gap-[60px]">
        <div className="relative aspect-[4/3] w-full bg-gray-500">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              priority
              sizes="900px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
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
                {getGenreLabel(item.genre)}
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

          <div className="border-b border-gray-500 py-[28px]">
            <div className="border-b-2 border-gray-200 pb-[10px]">
              <h2 className="flex items-center gap-[10px] text-[28px] font-bold whitespace-nowrap text-white">
                <Image
                  src={ExchangeIcon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden
                />
                교환 희망 정보
              </h2>
            </div>

            <div className="mt-[32px] flex items-center gap-[12px]">
              <GradeText grade={item.wantedGrade} />
              <span className="text-gray-400">|</span>
              <span className="text-[18px] font-bold text-gray-300">
                {getGenreLabel(item.wantedGenre)}
              </span>
            </div>

            <p className="mt-[40px] text-[15px] leading-[1.6] text-gray-300">
              {item.wantedDescription}
            </p>
          </div>

          <div className="mt-[30px] flex flex-col gap-[12px]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="bg-main h-[56px] w-full text-[16px] font-bold text-black"
            >
              수정하기
            </button>

            <button
              type="button"
              onClick={handleDeleteMarketItem}
              disabled={isDeletePending}
              className="h-[56px] w-full border border-gray-300 text-[16px] font-bold text-white disabled:opacity-50"
            >
              {isDeletePending ? '판매 내리는 중...' : '판매 내리기'}
            </button>
          </div>
        </aside>
      </section>

      <section className="mt-[80px]">
        <h2 className="border-b border-gray-200 pb-[20px] text-[32px] font-bold">
          교환 제시 목록
        </h2>

        {isPending ? (
          <p className="mt-[40px] text-[18px] text-gray-300">
            교환 제시를 불러오는 중...
          </p>
        ) : waitingExchangeProposals.length > 0 ? (
          <div className="mt-[40px] flex flex-wrap gap-[40px]">
            {waitingExchangeProposals.map((proposal) => (
              <ExchangeProposalCard
                key={proposal.id}
                proposal={proposal}
                onApprove={handleApproveExchange}
                onReject={handleRejectExchange}
                isApprovePending={isApprovePending}
                isRejectPending={isRejectPending}
              />
            ))}
          </div>
        ) : (
          <p className="mt-[40px] text-[18px] text-gray-300">
            받은 교환 제시가 없습니다.
          </p>
        )}
      </section>

      <MarketEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={item}
        itemId={itemId}
      />
    </main>
  );
};

export default SellerMarketDetailPage;
