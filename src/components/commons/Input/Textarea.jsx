'use client';

const Textarea = ({ ...props }) => {
  return (
    <>
      <textarea
        name="textarea-input"
        id="textarea-input"
        className="mt-[20px] h-[180px] w-full border border-white px-[20px] py-[12px] focus:bg-gray-500"
        placeholder="포토카드 설명을 입력해주세요."
        {...props}
      />
    </>
  );
};

export default Textarea;
