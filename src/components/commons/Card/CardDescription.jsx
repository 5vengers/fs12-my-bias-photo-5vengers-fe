const CardDescription = ({ children }) => {
  return (
    <div className="h-[46px] w-full">
      <p className="text-overflow overflow-hidden text-ellipsis text-white">
        {children}
      </p>
    </div>
  );
};

export default CardDescription;
