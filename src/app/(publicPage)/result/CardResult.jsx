'use client';

import ResultContent from '@/components/ResultPage/ResultContent';
import useCardStore from '@/store/useCardStore';
import { useEffect } from 'react';

const LINK_NAME = {
  myGallery: '마이갤러리',
  marketPlace: '마켓플레이스',
  mySales: '나의 판매 포토카드',
};

const CardResult = ({ config }) => {
  const { title, link, statusText, status } = config;

  const isSuccess = status === 'success';

  const { cardName, cardGrade, cardCount } = useCardStore((state) => ({
    cardName: state.cardName,
    cardGrade: state.cardGrade,
    cardCount: state.cardCount,
  }));

  const { reset } = useCardStore((state) => state.actions);

  useEffect(() => {
    reset();
  }, [reset]);

  // message 값 변환 (카드 정보 없으면 title, status만)
  const handleCardInfo = () => {
    if (cardName === '') {
      return;
    }

    if (cardCount === '') {
      return `[${cardGrade} | ${cardName}]`;
    }

    return `[${cardGrade} | ${cardName}]}`;
  };

  const handleLinkTxt = () => {
    const linkName = link.slice(1);

    if (!Object.keys(LINK_NAME).includes(linkName)) {
      return '';
    }

    return `${LINK_NAME[linkName]} ${isSuccess ? '확인하기' : '로 돌아가기'}`;
  };

  return (
    <>
      <ResultContent
        title={title}
        cardIngo={handleCardInfo()}
        link={link}
        isSuccess={isSuccess}
        btnTxt={handleLinkTxt()}
      />
    </>
  );
};

export default CardResult;
