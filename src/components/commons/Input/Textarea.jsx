'use client';

import useValidation from '@/hooks/useValidation';

const Textarea = ({ externalError, setValue, id }) => {
  const { validation, error } = useValidation();

  const displayError = externalError ?? error;

  return (
    <>
      <textarea
        name={id}
        id={id}
        className={`h-[180px] w-full border px-[20px] py-[12px] focus:bg-gray-500 ${displayError.isError ? 'border-red' : 'border-white'}`}
        placeholder="포토카드 설명을 입력해주세요."
        onChange={(e) => {
          setValue(e.target.value);
          validation('description', e.target.value);
        }}
        onBlur={(e) => validation('description', e.target.value)}
      />
      {displayError.isError && (
        <span className="text-red text-sm">{displayError.errMsg}</span>
      )}
    </>
  );
};

export default Textarea;
