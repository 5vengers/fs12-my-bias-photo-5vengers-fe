const CardSale = ({ title, type = 'count', count }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-gray-300">{title}</span>
      {type === 'point' && (
        <span className="text-lg text-white">{count} P</span>
      )}
      {type === 'count' && <span className="text-lg text-white">{count}</span>}
      {type === 'quantity' && (
        <>
          <span className="text-lg text-white">
            {count[0]}
            <span className="text-lg text-gray-300"> / {count[1]}</span>
          </span>
        </>
      )}
    </div>
  );
};

export default CardSale;
