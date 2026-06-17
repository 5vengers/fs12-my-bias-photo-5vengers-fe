'use client';

const QuantityStepper = ({ value, max, onChange }) => {
  const handleDecrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-[12px]">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= 1}
        className="flex h-[40px] w-[40px] items-center justify-center border border-gray-400 text-[24px] text-white disabled:opacity-30"
      >
        −
      </button>

      <span className="min-w-[32px] text-center text-[18px] font-bold text-white">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className="flex h-[40px] w-[40px] items-center justify-center border border-gray-400 text-[24px] text-white disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
