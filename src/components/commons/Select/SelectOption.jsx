const SelectOption = ({ children, onChange, value }) => {
  return <button onClick={() => onChange(value)}>{children}</button>;
};

export default SelectOption;
