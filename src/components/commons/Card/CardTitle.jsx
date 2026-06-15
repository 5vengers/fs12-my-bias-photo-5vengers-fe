const CardTitle = ({ children, className = '' }) => {
  const hasCustomMarginBottom = className.includes('mb-');

  return (
    <div
      className={`w-full ${hasCustomMarginBottom ? '' : 'mb-[10px]'} ${className}`}
    >
      <p className="overflow-hidden text-[22px] font-bold text-ellipsis whitespace-nowrap text-white">
        {children}
      </p>
    </div>
  );
};

export default CardTitle;
