import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import apiClient from '@/libs/apiClient';
import MinusIcon from '@/assets/icons/ic-minus.svg';
import PlusIcon from '@/assets/icons/ic-plus.svg';
import ExchangeInfoForm from './ExchangeInfoForm';
import { useCreateMarketItem } from '@/hooks/useMarketItems';
import { GENRE_OPTIONS } from '@/constants/marketOptions';
import { useQueryClient } from '@tanstack/react-query';

function FormStep({ card, onBack }) {
  const textColor = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [price, setPrice] = useState('');
  const [exchangeGrade, setExchangeGrade] = useState('');
  const [exchangeGenre, setExchangeGenre] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState('');
  const [formErrors, setFormErrors] = useState({
    price: '',
    quantity: '',
  });
  const isLoadingMax = maxQuantity === null;
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

  useEffect(() => {
    if (!card?.id) return;

    let isMounted = true;

    async function fetchMax() {
      try {
        const res = await apiClient.get(`/api/market/items/${card.id}/max`);

        if (isMounted) {
          setMaxQuantity(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchMax();

    return () => {
      isMounted = false;
    };
  }, [card?.id]);

  useEffect(() => {
    if (maxQuantity !== null && quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
  }, [maxQuantity]);

  const increase = () => {
    if (isLoadingMax) return;
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const decrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };
  if (!card) return null;

  const handleCancel = () => {
    onBack?.();
  };

  const handleQuantity = (e) => {
    const value = e.target.value;

    setFormErrors((prev) => ({ ...prev, quantity: '' }));

    if (value === '') {
      setQuantity('');
      return;
    }

    const num = Number(value);

    if (isNaN(num)) return;

    setQuantity(Math.max(1, Math.min(num, maxQuantity)));
  };

  const handleSell = () => {
    const nextErrors = {
      price: '',
      quantity: '',
    };

    if (!price) {
      nextErrors.price = '가격을 입력해주세요.';
    }

    if (!quantity || Number(quantity) < 1) {
      nextErrors.quantity = '수량을 입력해주세요.';
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
            <div className="flex w-full items-center justify-between">
              <span className="text-[20px] text-white">총 판매 수량</span>

              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[50px] w-[176px] shrink-0 items-center justify-center rounded-[2px] border border-[var(--gray-gray200)] bg-[var(--gray-gray500)] text-[20px]">
                    <button type="button" className="p-2" onClick={decrease}>
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
                      onChange={handleQuantity}
                    />
                    <button type="button" className="p-2" onClick={increase}>
                      <Image
                        src={PlusIcon}
                        alt="마이너스"
                        width={50}
                        height={50}
                      />
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-left text-[20px] font-bold">
                      / {isLoadingMax ? '...' : card.quantity}
                    </div>

                    <div className="text-right text-[14px]">
                      최대 {isLoadingMax ? '...' : maxQuantity}장
                    </div>
                  </div>
                </div>
                {formErrors.quantity && (
                  <p className="text-red mt-[8px] text-[14px]">
                    {formErrors.quantity}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="text-[20px] text-white">장당 가격</div>

              <div>
                <div className="flex h-[50px] w-[242px] shrink-0 items-center justify-between rounded-[2px] border border-gray-200 bg-gray-500 px-5 py-6 text-[20px]">
                  <input
                    value={price}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setPrice(value);
                      setFormErrors((prev) => ({ ...prev, price: '' }));
                    }}
                    placeholder="숫자만 입력"
                    className="w-24 bg-transparent text-left text-[20px] font-bold text-white outline-none placeholder:text-[16px] placeholder:font-light placeholder:text-white"
                  />
                  <p className="text-[20px] font-bold text-white">P</p>
                </div>

                {formErrors.price && (
                  <p className="text-red mt-[8px] text-[14px]">
                    {formErrors.price}
                  </p>
                )}
              </div>
            </div>
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
