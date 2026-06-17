'use client';
import Select from '@/components/commons/Select/Select';
function ExchangeInfoForm({
  grade,
  setGrade,
  genre,
  setGenre,
  description,
  setDescription,
}) {
  return (
    <div className="mt-20 mb-20 flex flex-col">
      <div className="mb-13 border-b-2 pb-2 text-[23px] font-bold text-white">
        교환 희망 정보
      </div>
      <div className="flex gap-8">
        {/* 등급 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] font-bold text-white">등급</h3>
          <Select
            size="md"
            desc="등급을 선택해 주세요"
            id="card-grade"
            onChange={setGrade}
          >
            <Select.Option value="">전체 등급</Select.Option>

            <Select.Option value="COMMON">COMMON</Select.Option>

            <Select.Option value="RARE">RARE</Select.Option>

            <Select.Option value="SUPER_RARE">SUPER RARE</Select.Option>

            <Select.Option value="LEGENDARY">LEGENDARY</Select.Option>
          </Select>
        </div>

        {/* 장르 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] font-bold text-white">장르</h3>
          <Select
            id="card-genre"
            size="md"
            desc="장르를 선택해주세요"
            onChange={setGenre}
          >
            <Select.Option value="">전체 장르</Select.Option>

            <Select.Option value="ALBUM">앨범</Select.Option>

            <Select.Option value="BENEFIT">특전</Select.Option>

            <Select.Option value="FANSIGN">팬싸</Select.Option>

            <Select.Option value="SEASON_GREETING">시즌그리팅</Select.Option>

            <Select.Option value="FAN_MEETING">팬미팅</Select.Option>

            <Select.Option value="CONCERT">콘서트</Select.Option>

            <Select.Option value="MD">MD</Select.Option>

            <Select.Option value="COLLAB">콜라보</Select.Option>

            <Select.Option value="FAN_CLUB">팬클럽</Select.Option>

            <Select.Option value="ETC">기타</Select.Option>
          </Select>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <label
          htmlFor="exchange-description"
          className="text-[20px] font-bold text-white"
        >
          교환 희망 설명
        </label>
        <textarea
          className="flex w-full flex-1 shrink-0 resize-none rounded-[2px] border border-gray-200 bg-gray-500 p-[18px_20px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          placeholder="교환 희망 설명을 입력하세요"
          id="exchange-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ExchangeInfoForm;
