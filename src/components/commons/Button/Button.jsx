const Button = ({
  children,
  size = 'lg',
  isThick = true,
  active,
  btnType = 'button',
  type = 'pri',
}) => {
  // true 면 thick, false 면 thin
  const thickness = ['h-[43px]', 'h-[52px]'];

  // 기본 lg
  const sizing = {
    sm: 'w-[150px]',
    lg: 'w-[520px]',
  };

  // 기본 pri (노란색)
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
