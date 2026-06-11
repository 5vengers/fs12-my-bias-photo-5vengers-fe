'use client';

import { useState } from 'react';
import Image from 'next/image';
import CloseIcon from '@/assets/icons/ic-close.svg';
import SearchIcon from '@/assets/icons/ic-search.svg';
import Select from '@/components/commons/Select/Select';

export default function ModalSell({ isOpen, onClose }) {
  const [step, setStep] = useState('gallery');
  const [selectedCard, setSelectedCard] = useState(null);
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const handleGradeChange = (value) => {
    setGrade(value);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative flex h-[1160px] w-[1100px] flex-col bg-gray-500 px-[120px] py-[60px]">
        {step === 'gallery' ? (
          <GalleryStep
            onClose={onClose}
            onSelect={(card) => {
              setSelectedCard(card);

              setStep('form');
            }}
            grade={grade}
            handleGradeChange={handleGradeChange}
            genre={genre}
            setGenre={setGenre}
          />
        ) : (
          <FormStep
            card={selectedCard}
            onBack={() => setStep('gallery')}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

// 갤러리 섹션

function GalleryStep({
  onSelect,
  onClose,
  grade,
  handleGradeChange,
  genre,
  setGenre,
}) {
  // 나중에 API로 받아올 데이터입니다.

  const myCards = [
    /* ...카드 데이터들... */
  ];

  return (
    <div className="flex h-full flex-col">
      <div
        className="absolute -top-[-30px] -right-[-30px] cursor-pointer"
        onClick={onClose}
      >
        <Image src={CloseIcon} alt="닫기버튼" width={24} height={24} />
      </div>
      <h3 className="font-baskin mb-7 text-[24px] tracking-[-0.72px] text-[#A4A4A4]">
        마이갤러리
      </h3>
      <h2 className="font-baskin mb-5 border-b-2 pb-5 text-[46px] font-normal tracking-[-1.38px] text-white">
        나의 포토카드 판매하기
      </h2>
      <div className="mb-[40px] flex items-center gap-12">
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
      </div>

      {/* 카드 리스트 영역 (스크롤바 적용) */}

      <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto pr-2">
        {/* 임시 카드 박스 2열 */}

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            onClick={() => onSelect({ id: i })}
            className="h-[200px] cursor-pointer border border-white p-4 hover:bg-white/10"
          >
            내 카드 {i}
          </div>
        ))}
      </div>
    </div>
  );
}

// 입력 폼 섹션 (나중에 상세 구현)

function FormStep({ card, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="mb-4 text-gray-400">
        ← 뒤로가기
      </button>

      <h2 className="text-xl font-bold">카드 {card.id} 판매 정보 입력</h2>

      {/* 여기에 가격 입력, 설명 등 폼 배치 */}
    </div>
  );
}
