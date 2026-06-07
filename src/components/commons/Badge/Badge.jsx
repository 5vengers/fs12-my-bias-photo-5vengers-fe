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
      className={`flex w-fit items-center justify-center gap-[10px] border px-[20px] py-[8px] ${colorCode[grade]}`}
    >
      <span>{grade === 'SUPER_RARE' ? 'SUPER RARE' : grade}</span>
      <span>{count}장</span>
    </div>
  );
};

export default Badge;
