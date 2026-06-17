'use client';

import Image from 'next/image';
import MinusIcon from '@/assets/icons/ic-minus.svg';
import PlusIcon from '@/assets/icons/ic-plus.svg';

const QuantityStepper = ({ value, min = 1, max, onChange }) => {
  const handleDecrease = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleIncrease = () => {
    onChange(Math.min(max, value + 1));
  };

  return (
    <div className="flex h-[50px] w-[176px] items-center justify-between rounded-[2px] border border-gray-200 bg-gray-500 px-[12px]">
      <button type="button" onClick={handleDecrease} disabled={value <= min}>
        <Image src={MinusIcon} alt="수량 감소" width={22} height={22} />
      </button>

      <span className="w-[60px] text-center text-[18px] font-bold text-white">
        {value}
      </span>

      <button type="button" onClick={handleIncrease} disabled={value >= max}>
        <Image src={PlusIcon} alt="수량 증가" width={22} height={22} />
      </button>
    </div>
  );
};

export default QuantityStepper;
