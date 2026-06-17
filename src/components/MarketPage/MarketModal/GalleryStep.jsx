import React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/icons/ic-search.svg';
import Select from '@/components/commons/Select/Select';
import Card from '../../commons/Card/Card';
import logoImage from '@/assets/images/img-logo.svg';
import { useMyCards } from '@/hooks/queries/useMarketItems';

function GalleryStep({ onSelect, grade, handleGradeChange, genre, setGenre }) {
  const { data: myCards = [] } = useMyCards();
  console.log('myCards value:', myCards);

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
                  <span className="text-gray-300">{card.genre}</span>
                </Card.Info>
              </Card.InfoLayout>
              <Card.SaleInfoLayout>
                <Card.SaleInfo
                  title={'가격'}
                  type={'point'}
                  count={card.price}
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
