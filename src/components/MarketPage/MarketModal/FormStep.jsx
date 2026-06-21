import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useSellForm from '@/hooks/useSellForm';
import ExchangeInfoForm from './ExchangeInfoForm';
import { useCreateMarketItem } from '@/hooks/useMarketItems';
import { GENRE_OPTIONS } from '@/constants/marketOptions';
import { useQueryClient } from '@tanstack/react-query';
import PriceSection from './PriceSection';
import QuantitySection from './QuantitySection';

function FormStep({ card, onBack }) {
  if (!card) return null;
  const textColor = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };
  const {
    quantity,
    maxQuantity,
    isLoadingMax,
    price,
    setPrice,
    exchangeGrade,
    setExchangeGrade,
    exchangeGenre,
    setExchangeGenre,
    exchangeDescription,
    setExchangeDescription,
    increase,
    decrease,
    handleQuantity,
  } = useSellForm(card);

  const [formErrors, setFormErrors] = useState({
    price: '',
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const grade = card.grade;

  const { mutate, isPending } = useCreateMarketItem({
    onSuccess: (data) => {
      router.replace('/result?type=sell&status=success&domain=card');
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
    },
    onError: (err) => {
      console.error('판매 실패:', err);
      router.replace('/result?type=sell&status=fail&domain=card');
    },
  });

  const handleCancel = () => {
    onBack?.();
  };

  const handleSell = () => {
    const nextErrors = {
      price: '',
      quantity: '',
    };
    const numericQuantity = Number(quantity);

    if (!price) {
      setFormErrors((prev) => ({
        ...prev,
        price: '가격을 입력해주세요.',
      }));
      return;
    }

    if (!quantity || numericQuantity < 1) {
      nextErrors.quantity = '수량을 입력해주세요.';
    } else if (maxQuantity !== null && numericQuantity > maxQuantity) {
      nextErrors.quantity = `최대 ${maxQuantity}장까지 판매할 수 있습니다.`;
    }

    if (nextErrors.price || nextErrors.quantity) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors({ price: '', quantity: '' });

    mutate({
      myCardId: card.id,
      quantity: Number(quantity),
      price_per_card: Number(price),
      wanted_grade: exchangeGrade || null,
      wanted_genre: exchangeGenre || null,
      wanted_description: exchangeDescription || null,
    });
  };

  return (
    <div className="custom-scrollbar -mr-[30px] flex flex-1 flex-col overflow-y-auto pr-[30px]">
      <h3 className="font-baskin mb-7 text-[24px] tracking-[-0.72px] text-gray-300">
        나의 포토카드 판매하기
      </h3>
      <h2 className="font-baskin mb-5 border-b-2 pb-5 text-[46px] tracking-[-1.38px] text-white">
        {card.name}
      </h2>
      <div className="mt-8 flex gap-10">
        <div className="relative h-[330px] w-[440px]">
          <Image
            src={card.imageUrl}
            alt={card.name}
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
                {GENRE_OPTIONS.find((g) => g.value === card.genre)?.label ??
                  card.genre}
              </span>
            </div>

            {/* 오른쪽: 닉네임 */}
            <span className="text-[24px] leading-none font-bold text-white underline decoration-solid">
              {card.nickname}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-7">
            <QuantitySection
              quantity={quantity}
              maxQuantity={maxQuantity}
              isLoadingMax={isLoadingMax}
              increase={increase}
              decrease={decrease}
              handleQuantity={handleQuantity}
              card={card}
            />

            <PriceSection
              price={price}
              setPrice={setPrice}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          </div>
        </div>
      </div>
      <ExchangeInfoForm
        grade={exchangeGrade}
        setGrade={setExchangeGrade}
        genre={exchangeGenre}
        setGenre={setExchangeGenre}
        description={exchangeDescription}
        setDescription={setExchangeDescription}
      />
      <div className="flex gap-[25px] border-t border-[#2E2E2E] pt-[25px] pb-8">
        <button
          onClick={handleCancel}
          className="flex h-[60px] flex-1 items-center justify-center rounded-[2px] border border-white bg-gray-500 text-[18px] font-bold text-white"
        >
          취소하기
        </button>

        <button
          onClick={handleSell}
          disabled={isPending}
          className="bg-main flex h-[60px] flex-1 items-center justify-center rounded-[2px] text-[18px] font-bold text-black"
        >
          {isPending ? '등록 중...' : '판매하기'}
        </button>
      </div>
    </div>
  );
}

export default FormStep;
