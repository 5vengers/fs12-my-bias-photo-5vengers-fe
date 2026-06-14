const FormField = ({ label, labelFor, children }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor}>{label}</label>
      <div className="mt-[20px]">{children}</div>
    </div>
  );
};

export default FormField;
