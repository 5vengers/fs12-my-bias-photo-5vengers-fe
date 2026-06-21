import React from 'react';

function PriceSection({ price, setPrice, formErrors, setFormErrors }) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="price" className="text-[20px] text-white">
        장당 가격
      </label>

      <div className="flex flex-col items-end">
        <div
          className={`flex h-[50px] w-[242px] shrink-0 items-center justify-between rounded-[2px] border bg-gray-500 px-5 py-6 text-[20px] ${
            formErrors.price ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <input
            value={price}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setPrice(value);

              if (value) {
                setFormErrors((prev) => ({
                  ...prev,
                  price: '',
                }));
              }
            }}
            placeholder="숫자만 입력"
            className="w-24 bg-transparent text-left text-[20px] font-bold text-white outline-none placeholder:text-[16px] placeholder:font-light placeholder:text-white"
          />
          <p className="text-[20px] font-bold text-white">P</p>
        </div>

        {formErrors.price && (
          <p className="mt-1 text-sm text-red-500">{formErrors.price}</p>
        )}
      </div>
    </div>
  );
}

export default PriceSection;
