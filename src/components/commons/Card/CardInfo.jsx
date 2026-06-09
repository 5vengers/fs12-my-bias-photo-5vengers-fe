const CardInfo = ({ children, nickname }) => {
  return (
    <div className="mb-[20px] flex w-full items-center justify-between border-b border-gray-400 pb-[20px]">
      <div className="info-box flex items-center justify-center gap-[10px]">
        {children}
      </div>
      <span className="border-b text-white">{nickname}</span>
    </div>
  );
};

export default CardInfo;
