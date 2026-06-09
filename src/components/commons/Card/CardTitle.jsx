const CardTitle = ({ children }) => {
  return (
    <div className="mb-[10px] w-full">
      <p className="overflow-hidden text-[22px] font-bold text-ellipsis whitespace-nowrap text-white">
        {children}
      </p>
    </div>
  );
};

export default CardTitle;
