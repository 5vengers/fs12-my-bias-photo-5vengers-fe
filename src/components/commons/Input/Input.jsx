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
  ...props
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
        className={`w-full border border-gray-200 bg-black px-[20px] py-[18px] text-white focus:outline-none ${sizeStyle[size]} ${type === 'number' ? 'input-h-scroll' : ''} ${displayError.isError ? 'border-red' : ''}`}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          const filterValue =
            type === 'number'
              ? value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '')
              : value;

          console.log(filterValue);

          setValue(filterValue);
          validation(validationType || type, filterValue);
        }}
        onBlur={(e) => validation(validationType || type, e.target.value)}
        {...props}
      />
      {displayError.isError && (
        <span className="text-red text-sm">{displayError.errMsg}</span>
      )}
    </>
  );
};

export default Input;
