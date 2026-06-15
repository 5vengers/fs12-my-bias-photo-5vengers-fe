'use client';
import React from 'react';
import Link from 'next/link';
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
          className="flex h-[60px] w-[440px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--main)] text-[18px] font-bold !text-black transition hover:opacity-90"
        >
          나의 포토카드 판매하기 →
        </button>
      </div>
      <div className="mt-4 mb-12 flex items-center justify-between gap-6">
        {/* 왼쪽 영역 */}
        <div className="flex items-center gap-12">
          {/* 검색 */}
          <div className="flex h-[50px] w-[320px] items-center justify-between rounded-[2px] border border-[var(--gray200)] bg-[var(--black)] px-5">
            <input
              type="text"
              placeholder="검색"
              className="w-full bg-transparent text-white placeholder:text-[var(--gray300)] focus:outline-none"
            />

            <span className="ml-2 text-[20px] text-[var(--gray300)]">
              <Image src={SearchIcon} alt="검색" width={20} height={20} />
            </span>
          </div>
          {/* 등급 */}
          <Select size="noLine" desc="등급" value={grade}>
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

          {/* 장르 */}
          <Select size="noLine" desc="장르" value={genre}>
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
