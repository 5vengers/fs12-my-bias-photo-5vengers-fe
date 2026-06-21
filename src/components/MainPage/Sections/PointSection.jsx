import Image from 'next/image';
import styles from '../MainPage.module.css';

const PointSection = () => {
  return (
    <section className="relative flex min-h-[900px] w-full items-center overflow-hidden bg-black">
      <div className="absolute top-[450px] right-[0] z-[1] size-[1480px] rounded-full border-2 border-yellow-400 bg-gradient-to-b from-yellow-400 to-stone-950 opacity-20 shadow-[inset_0px_0px_50px_0px_rgba(255,255,255,0.10)]" />
      <div className="mx-auto flex w-full max-w-[1070px] flex-col items-center justify-center">
        <div className="w-full">
          <h2 className="mb-4 text-4xl font-bold text-white">
            포인트로 <span className="text-main">안전하게</span> 거래하세요
          </h2>
          <p className="mb-[60px] text-lg leading-[1.8] text-white/45">
            내 포토카드를 포인트로 팔고, 원하는 포토카드를
            <br />
            포인트로 안전하게 교환하세요
          </p>
        </div>

        <div className="relative flex h-full w-full items-center justify-end">
          <div className="absolute top-[0] left-[0] z-[3] h-[180px]">
            <div className="absolute top-[60px] left-[100px] h-[80px] w-[300px] rounded-full bg-zinc-700/80">
              <div className="flex h-full w-full items-center justify-between px-[35px]">
                <span className="text-xl font-extrabold">1,540 P</span>
                <Image
                  src={'/images/ic-alarm-default.svg'}
                  width={24}
                  height={24}
                  alt="알람 아이콘"
                />
                <span className="font-baskin text-xl text-white">유디</span>
              </div>
            </div>
            <div className="absolute top-[90px] left-[130px]">
              {/* 플로팅 포인트들 */}
              {[
                {
                  val: '+40 P',
                  left: '20px',
                  top: '0px',
                  delay: '0s',
                  size: '22px',
                  opacity: 1,
                },
                {
                  val: '+40 P',
                  left: '40px',
                  top: '60px',
                  delay: '1s',
                  size: '18px',
                  opacity: 0.65,
                },
                {
                  val: '+28 P',
                  left: '70px',
                  top: '100px',
                  delay: '0.5s',
                  size: '15px',
                  opacity: 0.4,
                },
                {
                  val: '+12 P',
                  left: '10px',
                  top: '130px',
                  delay: '1.5s',
                  size: '12px',
                  opacity: 0.25,
                },
              ].map(({ val, left, top, delay, size, opacity }) => (
                <div
                  key={val + top}
                  style={{
                    '--left': left,
                    '--top': top,
                    '--size': size,
                    '--opacity': opacity,
                    '--delay': delay,
                  }}
                  className={`text-main absolute w-[100px] animate-[floatUp_3s_ease-in_infinite] font-extrabold ${styles.floatingPoint}`}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[2] h-[464px] w-full max-w-[727px]">
            <Image
              src={'/images/img-landing-2.webp'}
              alt="포토카드 거래"
              fill
              priority
              sizes="(max-width: 1070px) 100vw, 1070px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointSection;
