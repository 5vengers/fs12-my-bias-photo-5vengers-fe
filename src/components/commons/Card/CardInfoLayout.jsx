const CardInfoLayout = ({ children, className }) => {
  return <div className={`w-full ${className ?? 'my-[25px]'}`}>{children}</div>;
};

export default CardInfoLayout;
