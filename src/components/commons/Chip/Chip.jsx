/* type = sale | exchange */

const Chip = ({ type = 'sale' }) => {
  const typeStyle = {
    sale: 'text-white',
    exchange: 'text-main',
  };

  const chipText = {
    sale: '판매 중',
    exchange: '교환 제시 대기 중',
  };

  return (
    <div
      className={`absolute rounded-xs bg-black/50 px-[10px] py-[4px] ${typeStyle[type]}`}
    >
      {chipText[type]}
    </div>
  );
};

export default Chip;
