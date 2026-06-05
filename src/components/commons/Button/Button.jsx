const Button = ({
  children,
  size = 'lg',
  isThick,
  active,
  btnType = 'button',
  type,
}) => {
  const thickness = ['h-[43px]', 'h-[52px]'];
  const sizing = {
    sm: 'w-[150px]',
    lg: 'w-[520px]',
  };

  const typeColor = {
    pri: 'bg-main text-black',
    sec: 'bg-black text-white border border-white',
  };

  return (
    <button
      type={btnType}
      className={`rounded-xs ${sizing[size]} ${typeColor[type]} ${thickness[Number(isThick)]}`}
    >
      {children}
    </button>
  );
};

export default Button;
