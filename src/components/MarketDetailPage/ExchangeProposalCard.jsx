import Image from 'next/image';
import GradeText from '@/components/commons/Badge/GradeText';

const ExchangeProposalCard = ({
  proposal,
  onApprove,
  onReject,
  isApprovePending,
  isRejectPending,
}) => {
  const photoCard = proposal.offeredCard?.photoCard;
  const title = photoCard?.name ?? '포토카드';
  const imageUrl = photoCard?.imageUrl;
  const grade = photoCard?.grade;
  const genre = photoCard?.genre;
  const description = photoCard?.description ?? '';

  return (
    <article className="w-[300px] border border-gray-500 bg-gray-500 p-[24px]">
      <div className="relative h-[180px] w-full bg-gray-400">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="300px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[14px] text-gray-300">
            이미지가 없습니다
          </div>
        )}
      </div>

      <h3 className="mt-[16px] text-[20px] font-bold text-white">{title}</h3>

      <div className="mt-[10px] flex items-center gap-[8px] border-b border-gray-400 pb-[14px]">
        <GradeText grade={grade} />
        <span className="text-[14px] text-gray-400">|</span>
        <span className="text-[14px] font-bold text-gray-300">{genre}</span>
      </div>

      <p className="mt-[16px] h-[44px] overflow-hidden text-[14px] leading-[1.55] text-gray-300">
        {description}
      </p>

      <div className="mt-[24px] grid grid-cols-2 gap-[8px]">
        <button
          type="button"
          onClick={() => onReject(proposal.id)}
          disabled={isRejectPending || isApprovePending}
          className="h-[42px] border border-gray-300 text-[14px] font-bold text-white disabled:opacity-50"
        >
          거절하기
        </button>

        <button
          type="button"
          onClick={() => onApprove(proposal.id)}
          disabled={isRejectPending || isApprovePending}
          className="bg-main h-[42px] text-[14px] font-bold text-black disabled:bg-gray-400"
        >
          승인하기
        </button>
      </div>
    </article>
  );
};

export default ExchangeProposalCard;
