'use client';
import React from 'react';
import { GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/marketOptions';
import Image from 'next/image';
import { useState } from 'react';
import SearchIcon from '../../assets/icons/ic-search.svg';
import Select from '@/components/commons/Select/Select';
import MarketListPage from '@/components/MarketPage/MarketListPage';
import SellModal from '@/components/MarketPage/MarketModal/ModalSell';

export default function MarketPageClient() {
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [soldOut, setSoldOut] = useState('');
  const [sort, setSort] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleGradeChange = (value) => {
    setGrade(value);
  };

  return (
    <div className="w-full px-[220px] pt-[60px] pb-[220px]">
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-5">
        <h1 className="font-baskin text-[62px] font-normal tracking-[-1.86px] text-white">
          마켓플레이스
        </h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-main flex h-[60px] w-[440px] items-center justify-center gap-[10px] rounded-[2px] text-[18px] font-bold text-black! transition hover:opacity-90"
        >
          나의 포토카드 판매하기 →
        </button>
      </div>
      <div className="mt-4 mb-12 flex items-center justify-between gap-6">
        {/* 왼쪽 영역 */}
        <div className="flex items-center gap-12">
          {/* 검색 */}
          <div className="flex h-[50px] w-[320px] items-center justify-between rounded-[2px] border border-gray-200 bg-black px-5">
            <input
              type="text"
              placeholder="검색"
              className="w-full bg-transparent text-white placeholder:text-gray-300 focus:outline-none"
            />

            <span className="ml-2 text-[20px] text-gray-300">
              <Image src={SearchIcon} alt="검색" width={20} height={20} />
            </span>
          </div>
          {/* 등급 */}
          <Select size="noLine" desc="등급" value={grade}>
            {GRADE_OPTIONS.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
                onChange={handleGradeChange}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* 장르 */}
          <Select size="noLine" desc="장르" value={genre}>
            {GENRE_OPTIONS.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
                onChange={setGenre}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* 매진 여부 */}
          <Select size="noLine" desc="매진 여부" value={soldOut}>
            <Select.Option value="" onChange={setSoldOut}>
              전체 상태
            </Select.Option>
            <Select.Option value="ON_SALE" onChange={setSoldOut}>
              판매중
            </Select.Option>
            <Select.Option value="SOLD_OUT" onChange={setSoldOut}>
              매진
            </Select.Option>
          </Select>
        </div>

        {/* 오른쪽 정렬 */}
        <Select size="xs" desc="최신순" value={sort}>
          <Select.Option value="latest" onChange={setSort}>
            최신순
          </Select.Option>
          <Select.Option value="oldest" onChange={setSort}>
            오래된순
          </Select.Option>
          <Select.Option value="priceAsc" onChange={setSort}>
            낮은 가격순
          </Select.Option>
          <Select.Option value="priceDesc" onChange={setSort}>
            높은 가격순
          </Select.Option>
        </Select>
      </div>
      <MarketListPage
        grade={grade}
        genre={genre}
        soldOut={soldOut}
        sort={sort}
      />
      <SellModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
