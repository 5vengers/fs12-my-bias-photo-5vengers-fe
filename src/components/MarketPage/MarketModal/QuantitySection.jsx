import React from 'react';
import MinusIcon from '@/assets/icons/ic-minus.svg';
import PlusIcon from '@/assets/icons/ic-plus.svg';
import Image from 'next/image';

function QuantitySection({
  quantity,
  maxQuantity,
  isLoadingMax,
  increase,
  decrease,
  handleQuantity,
  card,
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <label htmlFor="sell-quantity" className="text-[20px] text-white">
        총 판매 수량
      </label>

      <div>
        <div className="flex items-center gap-4">
          <div className="flex h-[50px] w-[176px] shrink-0 items-center justify-center rounded-[2px] border border-[var(--gray-gray200)] bg-[var(--gray-gray500)] text-[20px]">
            <button
              type="button"
              className="p-2"
              onClick={decrease}
              aria-label="수량 감소"
            >
              <Image src={MinusIcon} alt="" width={50} height={50} />
            </button>
            <input
              id="sell-quantity"
              inputMode="numeric"
              className="w-full bg-transparent text-center outline-none"
              value={quantity}
              onChange={handleQuantity}
            />
            <button
              type="button"
              className="p-2"
              onClick={increase}
              aria-label="수량 증가"
            >
              <Image src={PlusIcon} alt="" width={50} height={50} />
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
      </div>
    </div>
  );
}

export default QuantitySection;
