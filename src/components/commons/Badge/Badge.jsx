import React from 'react';

const Badge = ({ grade, count }) => {
  const colorCode = {
    COMMON: 'text-main border-main',
    RARE: 'text-blue border-blue',
    SUPER_RARE: 'text-purple border-purple',
    LEGENDARY: 'text-pink border-pink',
  };
  return (
    <div
      className={`tablet:text-sm mobile:text-xs tablet:px-2.5 tablet:py-1.5 flex w-fit items-center justify-center gap-2.5 border px-5 py-2 ${colorCode[grade]}`}
    >
      <span>{grade === 'SUPER_RARE' ? 'SUPER RARE' : grade}</span>
      <span>{count}장</span>
    </div>
  );
};

export default Badge;
