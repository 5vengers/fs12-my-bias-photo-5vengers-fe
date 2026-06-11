/*
  text = title 에 들어갈 text
  children = 타이틀 부분에 button 이 들어갈 시 children 에 작성
*/

const Title = ({ text, children }) => {
  return (
    <div className="flex items-center justify-between border-b border-white pb-[20px]">
      <p className="font-(family-name:--font-baskin) text-6xl">{text}</p>
      {children ? children : ''}
    </div>
  );
};

export default Title;
