'use client';

const Textarea = ({ onChange }) => {
  return (
    <>
      <textarea
        name="textarea-input"
        id="textarea-input"
        className="h-[180px] w-full border border-white focus:bg-gray-500"
        placeholder="포토카드 설명을 입력해주세요."
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

export default Textarea;
