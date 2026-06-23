/*
  text = title 에 들어갈 text
  children = 타이틀 부분에 button 이 들어갈 시 children 에 작성
*/

const Title = ({ text, children }) => {
  return (
    <div className="flex items-center justify-between border-b border-white pb-5">
      <p className="font-baskin tablet:text-5xl mobile:text-[40px] text-6xl">
        {text}
      </p>
      {children ? children : ''}
    </div>
  );
};

export default Title;
