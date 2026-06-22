import Image from 'next/image';
import styles from '../MainPage.module.css';
import { useState, useEffect } from 'react';

const BOXES = [
  {
    src: '/images/img-box1.png',
  },
  {
    src: '/images/img-box2.png',
  },
  {
    src: '/images/img-box3.png',
  },
];

const RandomBoxSection = () => {
  const [time, setTime] = useState({ m: 59, s: 59 });
  const [openedIdx, setOpenedIdx] = useState(null);
  const [earnedPoint, setEarnedPoint] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        setOpenedIdx(null);
        setEarnedPoint(null);
        return { m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const handleBoxClick = (i) => {
    if (openedIdx !== null) return;
    const point = (Math.floor(Math.random() * 10) + 1) * 50;
    setOpenedIdx(i);
    setEarnedPoint(point);
  };

  return (
    <section className="relative flex min-h-[1000px] w-full flex-col justify-center overflow-hidden bg-gradient-to-b from-stone-950 to-lime-950">
      <div className="mx-auto flex h-full w-full max-w-[1070px] flex-col items-center justify-center">
        <div className="w-full">
          <h2 className="mb-3.5 text-4xl font-bold text-white">
            랜덤 상자로 <span className="text-main">포인트 받자!</span> 🎉
          </h2>
          <p className="mb-12 text-lg text-white/45">
            한 시간마다 주어지는 랜덤 상자를 열고,
            <br />
            포인트를 획득하세요
          </p>
        </div>

        {/* 디바이스 + 모달 래퍼 */}
        <div className="relative flex w-full justify-center">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative z-[2] h-[500px] w-full max-w-[890px]">
              <Image
                src={'/images/img-landing-4.webp'}
                alt="알림 예시"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1070px) 100vw, 1070px"
              />

              {/* 모달 */}
              <div className="border-main relative top-[30%] left-1/2 z-10 w-[670px] -translate-x-1/2 rounded-xs border-1 bg-gray-500 px-12 py-9 text-center">
                {/* 닫기 */}
                <div className="absolute top-3.5 right-[18px] text-lg text-white/50">
                  ✕
                </div>

                {/* 제목 */}
                <h3 className="font-baskin mb-[22px] text-5xl">
                  <span className="text-white">랜덤</span>
                  <span className="text-main">포인트</span>
                </h3>

                <p className="mb-1 text-base font-bold text-white">
                  1시간마다 돌아오는 기회!
                </p>
                <p className="mb-4 text-base font-bold text-white">
                  랜덤 상자 뽑기를 통해 포인트를 획득하세요!
                </p>

                <p className="mb-9 text-[13px] text-white/50">
                  다음 기회까지 남은 시간{' '}
                  <span className="text-main font-bold">
                    {pad(time.m)}분 {pad(time.s)}초
                  </span>
                </p>

                {/* 선물상자 */}
                <div className="relative z-20 flex items-center justify-between px-[60px] py-[20px]">
                  {BOXES.map(({ src }, i) => {
                    const isOpened = openedIdx === i;
                    const isDisabled = openedIdx !== null && !isOpened;

                    return (
                      <div key={i} className="flex flex-col items-center">
                        {isOpened ? (
                          /* ── 열린 상자: 포인트 결과 ── */
                          <div className="flex h-[130px] w-[120px] animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards] flex-col items-center justify-center">
                            <div className="mb-1.5 text-[32px]">🎉</div>
                            <div className="text-main text-[28px] leading-[1.1] font-black tracking-[-0.02em]">
                              +{earnedPoint} P
                            </div>
                            <div className="mt-1 text-[11px] text-white/50">
                              획득!
                            </div>
                          </div>
                        ) : (
                          /* ── 닫힌 상자 ── */
                          <button
                            onClick={() => handleBoxClick(i)}
                            style={{
                              '--anim-delay': `${i * 0.4}s`,
                            }}
                            className={`${styles.box} ${
                              isDisabled
                                ? styles.boxDisabled
                                : openedIdx === null
                                  ? `${styles.boxActive} ${styles.boxShaking}`
                                  : styles.boxActive
                            }`}
                          >
                            <Image
                              src={src}
                              alt={`선물상자-${i}`}
                              width={140}
                              height={120}
                              priority
                              className="h-auto w-32"
                            />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {earnedPoint !== null && (
                  <p className="text-xs text-white/35">
                    * 이 포인트는 예시입니다. 실제 획득 가능한 포인트가
                    아닙니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[338px] w-[787px]">
          <Image
            src={'/images/img-landing-4-1.webp'}
            alt="선물상자 1"
            fill
            sizes="(max-width: 1070px) 100vw, 1070px"
            className="h-100 w-auto"
            priority
          />
        </div>

        <div className="absolute top-0 right-0 h-[257px] w-[310px] translate-x-[-90%] translate-y-[130%]">
          <Image
            src={'/images/img-landing-4-2.webp'}
            alt="선물상자 2"
            fill
            sizes="(max-width: 1070px) 100vw, 1070px"
            className="h-100 w-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default RandomBoxSection;
