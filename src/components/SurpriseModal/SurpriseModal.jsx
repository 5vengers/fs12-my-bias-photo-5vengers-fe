'use client';

import Modal from '@/components/commons/Modal/Modal';
import { useIsAuthenticated } from '@/hooks/useAuth';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Button from '../commons/Button/Button';

import Box1 from '@/assets/images/img-box1.png';
import Box2 from '@/assets/images/img-box2.png';
import Box3 from '@/assets/images/img-box3.png';
import Point from '@/assets/images/img-point-lg.png';
import { useOpenPointBox } from '@/hooks/usePoint';
import { useSurpriseModalStore } from '@/store/supriseStore';

const TARGET_TIME = 60 * 60 * 1000; // 1 시간
const SAVED_TIME_KEY = 'point_time';

const Timer = ({ time }) => {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <p className="text-gray-300">다음 기회까지 남은 시간</p>
      <p className="text-main">{time}</p>
    </div>
  );
};

const SurpriseModal = () => {
  const isLogin = useIsAuthenticated();

  const { isOpen, close, setCanGetPoint } = useSurpriseModalStore();

  // timer target ref
  const targetTimeRef = useRef(null);

  const [remainTime, setRemainTime] = useState('00분 00초');

  const [selectBox, setSelectBox] = useState(null);

  const [hasReward, setHasReward] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const { mutate: createPoint, isPending, data: point } = useOpenPointBox();

  const imageSrc = [Box1, Box2, Box3];

  const startTimer = (startTime) => {
    // ref 값이 있으면 해당 값 clear
    if (targetTimeRef.current) clearInterval(targetTimeRef.current);

    // local 값 설정하기 (interval 돌 때 동안)
    localStorage.setItem(SAVED_TIME_KEY, String(startTime));

    // time ref 에 interval 값 설정
    targetTimeRef.current = setInterval(() => {
      const now = Date.now();
      const diff = startTime + TARGET_TIME - now;

      if (diff <= 0) {
        clearInterval(targetTimeRef.current);
        targetTimeRef.current = null;
        setRemainTime('00분 00초');
        setCanGetPoint(true);
        setHasReward(false);
        return;
      }

      const min = Math.floor((diff / (1000 * 60)) % 60);
      const sec = Math.floor((diff / 1000) % 60);

      setRemainTime(
        `${String(min).padStart(2, '0')}분 ${String(sec).padStart(2, '0')}초`,
      );
    }, 1000);
  };

  useEffect(() => {
    if (!isLogin) {
      return;
    }

    // local 값 받아오기
    const savedTime = localStorage.getItem(SAVED_TIME_KEY);

    // local 값 있으면 값에 따라 보상 받을 수 있는지 없는지 판별 후 timer 도 start 하기
    if (savedTime) {
      const startTime = Number(savedTime);
      const diff = startTime + TARGET_TIME - Date.now();

      if (diff > 0) {
        setHasReward(true);
        startTimer(startTime);
      } else {
        localStorage.removeItem(SAVED_TIME_KEY);
        setHasReward(false);
        setRemainTime('00분 00초');
        setCanGetPoint(true);
      }
    } else {
      startTimer(Date.now());
    }

    return () => {
      if (targetTimeRef.current) clearInterval(targetTimeRef.current);
    };
  }, [isLogin]);

  const handleSelectBox = (num) => {
    if (selectBox === num) {
      setSelectBox(null);
      return;
    }

    setSelectBox(num);
    return;
  };

  const openBox = (num) => {
    if (!num) {
      return;
    }

    createPoint(num, {
      onSuccess: () => {
        setHasReward(true);
        setIsResult(true);
        setCanGetPoint(false);
        localStorage.removeItem(SAVED_TIME_KEY);

        startTimer(Date.now());
      },
    });
  };

  return (
    <>
      {isOpen && (
        <Modal>
          <Modal.Close
            onClose={() => {
              close(false);
              setIsResult(false);
              setSelectBox(null);
            }}
          />
          <Modal.Title>
            <span className="font-baskin text-5xl font-normal">
              랜덤<span className="text-main">포인트</span>
            </span>
          </Modal.Title>
          {isResult ? (
            <>
              <div className="w-full max-w-[360px]">
                <Image
                  alt={'포인트 결과'}
                  src={Point}
                  width={'auto'}
                  height={'auto'}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-[20px]">
                <p className="text-3xl font-bold">
                  <span className="text-main">{point?.earnedPoint}P</span> 획득!
                </p>
                <Timer time={remainTime} />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-center text-xl font-bold text-white">
                  1시간마다 돌아오는 기회!
                  <br />
                  랜덤 상자 뽑기를 통해 포인트를 획득하세요!
                </p>
              </div>

              <Timer time={remainTime} />

              <div className="flex items-center justify-between gap-[60px]">
                {imageSrc.map((src, i) => (
                  <button
                    key={`present-${i}`}
                    type="button"
                    className={`w-full max-w-[250px] ${selectBox === i + 1 || !selectBox ? '' : 'brightness-50'} ${hasReward ? 'brightness-50' : ''}`}
                    onClick={() => handleSelectBox(i + 1)}
                    disabled={hasReward}
                  >
                    <Image
                      alt={`포인트 상자 ${i + 1}`}
                      src={src}
                      width={'auto'}
                      height={'auto'}
                    />
                  </button>
                ))}
              </div>
              {selectBox && (
                <Button
                  size="xl"
                  btnType="button"
                  onClick={() => openBox(selectBox)}
                  disabled={isPending}
                >
                  선택 완료
                </Button>
              )}
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default SurpriseModal;
