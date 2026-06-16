import { React, useState } from 'react';
import Select from '@/components/commons/Select/Select';
function ExchangeInfo() {
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const handleGradeChange = (value) => {
    setGrade(value);
  };
  return (
    <div className="mt-20 mb-20 flex flex-col">
      <div className="mb-13 border-b-2 pb-2 text-[23px] font-bold text-white">
        교환 희망 정보
      </div>
      <div className="flex gap-8">
        {/* 등급 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] font-bold text-white">등급</h3>
          <Select size="md" desc="등급을 선택해 주세요" value={grade}>
            <Select.Option value="" onChange={handleGradeChange}>
              전체 등급
            </Select.Option>

            <Select.Option value="COMMON" onChange={handleGradeChange}>
              COMMON
            </Select.Option>

            <Select.Option value="RARE" onChange={handleGradeChange}>
              RARE
            </Select.Option>

            <Select.Option value="SUPER_RARE" onChange={handleGradeChange}>
              SUPER RARE
            </Select.Option>

            <Select.Option value="LEGENDARY" onChange={handleGradeChange}>
              LEGENDARY
            </Select.Option>
          </Select>
        </div>

        {/* 장르 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] font-bold text-white">장르</h3>
          <Select size="md" desc="장르를 선택해주세요" value={genre}>
            <Select.Option value="" onChange={setGenre}>
              전체 장르
            </Select.Option>

            <Select.Option value="앨범" onChange={setGenre}>
              앨범
            </Select.Option>

            <Select.Option value="특전" onChange={setGenre}>
              특전
            </Select.Option>

            <Select.Option value="팬싸" onChange={setGenre}>
              팬싸
            </Select.Option>

            <Select.Option value="시즌그리팅" onChange={setGenre}>
              시즌그리팅
            </Select.Option>

            <Select.Option value="팬미팅" onChange={setGenre}>
              팬미팅
            </Select.Option>

            <Select.Option value="콘서트" onChange={setGenre}>
              콘서트
            </Select.Option>

            <Select.Option value="MD" onChange={setGenre}>
              MD
            </Select.Option>

            <Select.Option value="콜라보" onChange={setGenre}>
              콜라보
            </Select.Option>

            <Select.Option value="팬클럽" onChange={setGenre}>
              팬클럽
            </Select.Option>

            <Select.Option value="기타" onChange={setGenre}>
              기타
            </Select.Option>
          </Select>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <h3 className="text-[20px] font-bold text-white">교환 희망 설명</h3>
        <textarea
          className="flex w-full flex-1 shrink-0 resize-none items-start gap-[10px] rounded-[2px] border border-gray-200 bg-gray-500 p-[18px_20px] text-white outline-none"
          placeholder="교환 희망 설명을 입력하세요"
          rows={4}
        />
      </div>
    </div>
  );
}

export default ExchangeInfo;
