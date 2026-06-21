'use client';

import { useState } from 'react';
import Image from 'next/image';
import CloseIcon from '@/assets/icons/ic-close.svg';
import FormStep from './FormStep';
import GalleryStep from './GalleryStep';

export default function ModalSell({ isOpen, onClose }) {
  const [step, setStep] = useState('gallery');
  const [selectedCard, setSelectedCard] = useState(null);
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [keyword, setKeyword] = useState('');
  const handleGradeChange = (value) => {
    setGrade(value);
  };
  const handleClose = () => {
    setStep('gallery');
    setSelectedCard(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative flex h-[1000px] w-[1160px] flex-col bg-gray-500 px-[120px] py-[60px]">
        <div
          className="absolute top-[60px] right-[60px] z-[60] cursor-pointer"
          onClick={handleClose}
        >
          <Image src={CloseIcon} alt="닫기버튼" width={24} height={24} />
        </div>

        {step === 'gallery' ? (
          <GalleryStep
            onSelect={(card) => {
              setSelectedCard(card);
              setStep('form');
            }}
            keyword={keyword}
            setKeyword={setKeyword}
            grade={grade}
            handleGradeChange={handleGradeChange}
            genre={genre}
            setGenre={setGenre}
          />
        ) : (
          <FormStep card={selectedCard} onBack={() => setStep('gallery')} />
        )}
      </div>
    </div>
  );
}
