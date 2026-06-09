'use client';

import useValidation from '@/hooks/useValidation';

const Input = ({ id, type, placeholder, size = 'lg', value, setValue }) => {
  const { validation, error, setError } = useValidation();

  const sizeStyle = {
    sm: 'text-sm',
    lg: '',
  };

  return (
    <>
      <input
        className={`mt-[20px] w-full border border-gray-200 px-[20px] py-[18px] text-white active:bg-gray-500 ${sizeStyle[size]} ${error.isError ? 'border-red' : ''}`}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          validation(type, value);
        }}
        onBlur={() => validation(type, value)}
      />
      {error.isError && <span className="text-red">{error.errMsg}</span>}
    </>
  );
};

export default Input;
