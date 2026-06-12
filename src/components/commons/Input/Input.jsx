'use client';

import useValidation from '@/hooks/useValidation';

const Input = ({
  id,
  type,
  validationType,
  placeholder,
  size = 'lg',
  value,
  setValue,
  externalError,
}) => {
  const { validation, error } = useValidation();

  const displayError = externalError ?? error;

  const sizeStyle = {
    sm: 'text-sm',
    lg: '',
  };

  return (
    <>
      <input
        className={`mt-[10px] w-full border border-gray-200 bg-black px-[20px] py-[18px] text-white focus:outline-none ${sizeStyle[size]} ${displayError.isError ? 'border-red' : ''}`}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          validation(validationType || type, e.target.value);
        }}
        onBlur={(e) => validation(validationType || type, e.target.value)}
      />
      {displayError.isError && (
        <span className="text-red text-sm">{displayError.errMsg}</span>
      )}
    </>
  );
};

export default Input;