const CardInfo = ({ children, nickname, className }) => {
  const defaultStyle =
    'mb-[20px] flex w-full items-center justify-between border-b border-gray-400 pb-[20px]';

  return (
    // className을 넘겨주면 그게 적용되고, 안 넘겨주면 defaultStyle 적용
    <div className={className || defaultStyle}>
      <div className="info-box flex items-center justify-center gap-[10px]">
        {children}
      </div>
      <span className="border-b text-white">{nickname}</span>
    </div>
  );
};

export default CardInfo;
