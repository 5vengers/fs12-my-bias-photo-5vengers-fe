const SelectOption = ({ children, onChange, value }) => {
  return (
    <button type="button" className="w-full" onClick={() => onChange(value)}>
      {children}
    </button>
  );
};

export default SelectOption;
