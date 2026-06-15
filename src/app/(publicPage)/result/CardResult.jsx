'use client';

import ResultContent from '@/components/ResultPage/ResultContent';
import useCardStore from '@/store/cardStore.js';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const CardResult = ({ config }) => {
  const { title, link, isSuccess } = config;

  /* 전역 변수 카드 정보 */
  const { cardName, cardGrade, cardCount } = useCardStore(
    useShallow((state) => ({
      cardName: state.cardName,
      cardGrade: state.cardGrade,
      cardCount: state.cardCount,
    })),
  );

  const { reset } = useCardStore((state) => state.actions);

  /* 전역 변수 card 정보 삭제 */
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

    return `[${cardGrade} | ${cardName}] ${cardCount}장`;
  };

  return (
    <>
      <ResultContent
        title={title}
        info={handleCardInfo()}
        link={link}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default CardResult;
