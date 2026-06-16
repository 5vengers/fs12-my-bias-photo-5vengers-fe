import { useState } from 'react';
import Image from 'next/image';

import CloseIcon from '@/assets/icons/ic-close.svg';
import MinusIcon from '@/assets/icons/ic-minus.svg';
import PlusIcon from '@/assets/icons/ic-plus.svg';
import ExchangeInfoForm from './ExchangeInfoForm';

function FormStep({ card, onBack }) {
  const textColor = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LAGENDARY: 'text-pink',
  };
  const [quantity, setQuantity] = useState(1);
  if (!card) return null;
  const grade = card.photoCard.grade;

  const handleCancel = () => {
    onBack?.();
  };

  const handleSell = () => {
    // 나중에 판매 API 호출
    console.log('판매하기');
  };

  return (
    <div className="custom-scrollbar -mr-[30px] flex flex-1 flex-col overflow-y-auto pr-[30px]">
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
              <span className="text-[24px] leading-none font-bold text-gray-300">
                {card.photoCard.genre}
              </span>
            </div>

            {/* 오른쪽: 닉네임 */}
            <span className="text-[24px] leading-none font-bold text-white underline decoration-solid">
              {'닉네임'}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-7">
            <div className="flex w-full items-center justify-between">
              <span className="font-[Noto_Sans_KR] text-[20px] text-white">
                총 판매 수량
              </span>

              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[50px] w-[176px] shrink-0 items-center justify-center rounded-[2px] border border-[var(--gray-gray200)] bg-[var(--gray-gray500)] text-[20px]">
                    <button type="button" className="p-2">
                      <Image
                        src={MinusIcon}
                        alt="마이너스"
                        width={50}
                        height={50}
                      />
                    </button>
                    <input
                      className="w-full bg-transparent text-center outline-none"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button type="button" className="p-2">
                      <Image
                        src={PlusIcon}
                        alt="마이너스"
                        width={50}
                        height={50}
                      />
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-left font-[Noto_Sans_KR] text-[20px] font-bold">
                      / 3
                    </div>{' '}
                    {/*최대 가능 수로 수정 예정*/}
                    <div className="text-right font-[Noto_Sans_KR] text-[14px]">
                      최대 3장
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="font-[Noto_Sans_KR] text-[20px] text-white">
                장당 가격
              </div>
              <div className="flex h-[50px] w-[242px] shrink-0 items-center justify-between rounded-[2px] border border-[var(--gray-gray200)] bg-[var(--gray-gray500)] px-5 py-6 text-[20px]">
                <input
                  placeholder="숫자만 입력"
                  className="w-24 bg-transparent text-left text-[20px] font-bold text-white outline-none placeholder:text-[16px] placeholder:font-light placeholder:text-white"
                ></input>
                <p className="font-[Noto_Sans_KR] text-[20px] font-bold text-white">
                  P
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExchangeInfoForm />
      <div className="flex gap-[25px] border-t border-[#2E2E2E] pt-[25px] pb-8">
        <button
          onClick={handleCancel}
          className="flex h-[60px] flex-1 items-center justify-center rounded-[2px] border border-[#EEE] bg-[#161616] text-[18px] font-bold text-white"
        >
          취소하기
        </button>

        <button
          onClick={handleSell}
          className="flex h-[60px] flex-1 items-center justify-center rounded-[2px] bg-[#EFFF04] text-[18px] font-bold text-black"
        >
          판매하기
        </button>
      </div>
    </div>
  );
}

export default FormStep;
