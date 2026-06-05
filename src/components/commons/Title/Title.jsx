const Title = ({ text, children }) => {
  return (
    <div className="flex items-center justify-between border-b border-white pb-[20px]">
      <p className="font-(family-name:--font-baskin) text-6xl">{text}</p>
      {children ? children : ''}
    </div>
  );
};

export default Title;
