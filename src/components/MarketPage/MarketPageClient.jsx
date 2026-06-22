'use client';
import React from 'react';
import { GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/marketOptions';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SearchIcon from '../../assets/icons/ic-search.svg';
import Select from '@/components/commons/Select/Select';
import MarketListPage from '@/components/MarketPage/MarketListPage';
import SellModal from '@/components/MarketPage/MarketModal/ModalSell';
import Modal from '@/components/commons/Modal/Modal';
import { useIsAuthenticated } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function MarketPageClient() {
  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [soldOut, setSoldOut] = useState('');
  const [sort, setSort] = useState('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const handleGradeChange = (value) => {
    setGrade(value);
  };
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {}, [isLoginModalOpen]);

  const checkAuth = (callback) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    callback?.();
  };

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-5">
        <h1 className="font-baskin text-[62px] font-normal tracking-[-1.86px] text-white">
          마켓플레이스
        </h1>
        <button
          type="button"
          onClick={() => {
            checkAuth(() => setIsModalOpen(true));
          }}
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
            <label htmlFor="market-search" className="sr-only">
              검색
            </label>

            <input
              type="text"
              placeholder="검색"
              id="market-search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-gray-300 focus:outline-none"
            />

            <span className="ml-2 text-[20px] text-gray-300">
              <Image src={SearchIcon} alt="검색" width={20} height={20} />
            </span>
          </div>
          {/* 등급 */}
          <Select size="noLine" desc="등급" onChange={handleGradeChange}>
            {GRADE_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* 장르 */}
          <Select size="noLine" desc="장르" onChange={setGenre}>
            {GENRE_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* 매진 여부 */}
          <Select size="noLine" desc="매진 여부" onChange={setSoldOut}>
            <Select.Option value="">전체 상태</Select.Option>
            <Select.Option value="SELLING">판매중</Select.Option>
            <Select.Option value="SOLD_OUT">매진</Select.Option>
          </Select>
        </div>

        {/* 오른쪽 정렬 */}
        <Select size="xs" desc="최신순" onChange={setSort}>
          <Select.Option value="latest">최신순</Select.Option>
          <Select.Option value="oldest">오래된순</Select.Option>
          <Select.Option value="priceAsc">낮은 가격순</Select.Option>
          <Select.Option value="priceDesc">높은 가격순</Select.Option>
        </Select>
      </div>
      <MarketListPage
        keyword={keyword}
        grade={grade}
        genre={genre}
        soldOut={soldOut}
        sort={sort}
      />
      <SellModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isLoginModalOpen && (
        <Modal>
          <Modal.Close onClose={() => setIsLoginModalOpen(false)} />
          <Modal.Title>로그인이 필요합니다.</Modal.Title>
          <Modal.Desc className="text-center whitespace-pre-line">
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </Modal.Desc>
          <Modal.Button size="sm" onClick={() => router.push('/login')}>
            확인
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
}
