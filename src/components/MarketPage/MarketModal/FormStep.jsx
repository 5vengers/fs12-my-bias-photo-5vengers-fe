import Image from 'next/image';
import CloseIcon from '@/assets/icons/ic-close.svg';
import GradeText from '@/components/commons/Badge/GradeText';
import CardInfo from '@/components/commons/Card/CardInfo';
import Card from '@/components/commons/Card/Card';
import CardGrade from '@/components/commons/Card/CardGrade';
import CardInfoLayout from '@/components/commons/Card/CardInfoLayout';
function FormStep({ card, onBack, onClose }) {
  const textColor = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LAGENDERY: 'text-pink',
  };
  const grade = card.photoCard.grade;
  if (!card) return null;

  return (
    <>
      <div
        className="absolute -top-[-30px] -right-[-30px] cursor-pointer"
        onClick={onClose}
      >
        <Image src={CloseIcon} alt="닫기버튼" width={24} height={24} />
      </div>
      <h3 className="font-baskin mb-7 text-[24px] tracking-[-0.72px] text-[#A4A4A4]">
        나의 포토카드 판매하기
      </h3>
      <h2 className="font-baskin mb-5 border-b-2 pb-5 text-[46px] font-normal tracking-[-1.38px] text-white">
        {card.photoCard.name}
      </h2>
      <div className="mt-8 flex gap-10">
        <div className="relative h-[330px] w-[440px]">
          <Image
            src={card.photoCard.imageUrl}
            alt={card.photoCard.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex w-full items-start justify-between border-b border-gray-400 pb-[30px]">
            {/* 왼쪽: 등급 | 장르 */}
            <div className="flex items-start gap-[15px]">
              {/* 등급 */}
              <span
                className={`text-[24px] leading-none font-bold ${textColor[grade] || 'text-white'}`}
              >
                {grade === 'SUPER_RARE' ? 'SUPER RARE' : grade}
              </span>

              <div className="h-5 w-[2px] bg-[var(--gray300)]" />

              {/* 장르 */}
              <span className="text-[24px] leading-none font-bold text-[var(--gray300)]">
                {card.photoCard.genre}
              </span>
            </div>

            {/* 오른쪽: 닉네임 */}
            <span className="text-[24px] leading-none font-bold text-white underline decoration-solid">
              {'닉네임'}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-7">
            <div className="flex justify-between">
              <div className="">총 판매 수량</div>
              <div>수량 박스</div>
            </div>

            <div className="flex justify-between">
              <div className="">장당 가격</div>
              <div>가격 박스</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col">
        <div>교환 희망 정보</div>
        <div className="flex">
          <div className="w-full">등급</div>
          <div className="w-full">장르</div>
        </div>
        <div>교환 희망 설명</div>
      </div>
    </>
  );
}

export default FormStep;
