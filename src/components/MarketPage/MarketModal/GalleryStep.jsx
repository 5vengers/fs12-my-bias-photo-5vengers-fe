import React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/icons/ic-search.svg';
import Select from '@/components/commons/Select/Select';
import Card from '../../commons/Card/Card';
import logoImage from '@/assets/images/img-logo.svg';
import { useMyCards } from '@/hooks/useMarketItems';
import { GENRE_OPTIONS, GRADE_OPTIONS } from '@/constants/marketOptions';
function GalleryStep({
  onSelect,
  grade,
  handleGradeChange,
  genre,
  setGenre,
  keyword,
  setKeyword,
}) {
  const { data: myCards = [] } = useMyCards({
    grade,
    genre,
    keyword,
  });
  return (
    <div className="flex h-full flex-col">
      <h3 className="font-baskin mb-7 text-[24px] tracking-[-0.72px] text-gray-300">
        마이갤러리
      </h3>
      <h2 className="font-baskin mb-5 border-b-2 pb-5 text-[46px] font-normal tracking-[-1.38px] text-white">
        나의 포토카드 판매하기
      </h2>
      <div className="mb-[40px] flex items-center gap-12">
        {/* 검색 */}
        <div className="flex h-[50px] w-[320px] items-center justify-between rounded-[2px] border border-gray-200 bg-black px-5">
          <label htmlFor="gallery-search" className="sr-only">
            포토카드 검색
          </label>
          <input
            type="text"
            placeholder="검색"
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
      </div>

      {/* 카드 리스트 영역 */}

      <div className="custom-scrollbar grid flex-1 grid-cols-2 gap-4 overflow-y-auto">
        {myCards.map((card) => (
          <div key={card.id} onClick={() => onSelect(card)}>
            <Card>
              <Card.Image src={card.imageUrl} alt={card.name} />
              <Card.Title className="mt-5 mb-[0px]">{card.name}</Card.Title>
              <Card.InfoLayout>
                <Card.Info nickname={card.nickname}>
                  <Card.Grade>{card.grade}</Card.Grade>
                  <span className="text-gray-300">
                    {' '}
                    {GENRE_OPTIONS.find((g) => g.value === card.genre)?.label ??
                      card.genre}
                  </span>
                </Card.Info>
              </Card.InfoLayout>
              <Card.SaleInfoLayout>
                <Card.SaleInfo
                  title={'가격'}
                  type={'point'}
                  count={card.price.toLocaleString()}
                />
                <Card.SaleInfo title={'수량'} count={card.quantity} />
              </Card.SaleInfoLayout>
              <div className="mt-[20px] flex items-center justify-center pt-[15px]">
                <Image
                  src={logoImage}
                  alt="브랜드 로고"
                  width={99}
                  height={18}
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryStep;
