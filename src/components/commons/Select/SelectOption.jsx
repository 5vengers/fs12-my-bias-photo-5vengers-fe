import { useSelectContext } from './SelectMain';

/*
  children = option에 들어갈 내용
  onChange = onChange 함수
  value = option 의 value 값
*/
const SelectOption = ({ children, value }) => {
  const { handleChange } = useSelectContext();

  return (
    <button
      type="button"
      className="w-full px-[16px] py-[10px] text-sm whitespace-nowrap hover:bg-gray-400"
      onClick={() => handleChange(value, children)}
    >
      {children}
    </button>
  );
};

export default SelectOption;
