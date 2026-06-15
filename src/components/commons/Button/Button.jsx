/*
  children = 버튼에 들어갈 text 및 html
  size = 버튼 사이즈 'lg, 'sm' (기본 'lg')
  isThick = 버튼 두껍기 (기본 true)
  disabled = 버튼 활성화 (기본 false)
  btnType = 버튼 타입 'button', 'submit' (기본 'button')
  type = 버튼 색 타입 'pri' = 노란색, 'sec' = 검은색 (기본 'pri')
  onClick = click 시 실행될 함수
*/

const Button = ({
  children,
  size = 'full',
  isThick = true,
  disabled = false,
  btnType = 'button',
  type = 'pri',
  ...props
}) => {
  // true 면 thick, false 면 thin
  const thickness = ['h-[43px]', 'h-[52px]'];

  // 기본 lg
  const sizing = {
    sm: 'w-[150px]',
    lg: 'w-[520px]',
    full: 'w-full',
  };

  // 기본 pri (노란색)
  const typeColor = {
    pri: 'bg-main text-black',
    sec: 'bg-black text-white border border-white',
    google: 'bg-white text-black border border-gray-300',
  };

  return (
    <button
      type={btnType}
      disabled={disabled}
      {...props}
      className={`rounded-xs font-bold disabled:bg-gray-400 disabled:text-gray-300 ${sizing[size]} ${typeColor[type]} ${thickness[Number(isThick)]}`}
    >
      {children}
    </button>
  );
};

export default Button;
