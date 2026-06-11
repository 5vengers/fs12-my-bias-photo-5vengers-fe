/*
  children = option에 들어갈 내용
  onChange = onChange 함수
  value = option 의 value 값
*/
const SelectOption = ({ children, onChange, value }) => {
  return (
    <button type="button" className="w-full" onClick={() => onChange(value)}>
      {children}
    </button>
  );
};

export default SelectOption;
