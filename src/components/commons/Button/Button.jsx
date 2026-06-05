const Button = ({ text, size, isThick, active, btnType = 'button', type }) => {
  const thickness = ['h-[43px]', 'h-[52px]'];

  const typeColor = {
    pri: 'bg-main text-black',
    sec: 'bg-black text-white border border-white',
  };

  return (
    <button
      type={btnType}
      className={`w-[345px] rounded-xs md:w-[342px] 2xl:w-[520px] ${typeColor[type]} ${thickness[Number(isThick)]}`}
    >
      {text}
    </button>
  );
};

export default Button;
