/* type = sale | EXCHANGE */

const Chip = ({ type = 'SELLING' }) => {
  const typeStyle = {
    SELLING: 'text-white',
    EXCHANGE: 'text-main',
  };

  const chipText = {
    SELLING: '판매 중',
    EXCHANGE: '교환 제시 대기 중',
  };

  return (
    <div
      className={`absolute rounded-xs bg-black/50 px-[10px] py-[4px] ${typeStyle[type]} top-[10px] left-[10px] z-[10]`}
    >
      {chipText[type]}
    </div>
  );
};

export default Chip;
