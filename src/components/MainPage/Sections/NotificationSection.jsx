import Image from 'next/image';

const NotificationSection = () => {
  return (
    <section className="relative flex min-h-[900px] w-full items-center overflow-hidden bg-black">
      <div className="absolute top-[150%] left-[50%] size-[1606px] -translate-1/2 rounded-full border-2 border-sky-500 bg-gradient-to-b from-sky-600 to-stone-950 opacity-30 shadow-[inset_0px_0px_50px_0px_rgba(255,255,255,0.10)]" />

      <div className="mx-auto flex h-full w-full max-w-[1070px] flex-col items-center justify-center">
        <div className="w-full">
          <h2 className="mb-4 text-4xl font-bold text-white">
            알림으로 보다 <span className="text-blue">빨라진 거래</span>
          </h2>
          <p className="text-[15px] leading-[1.8] text-white/45">
            교환 제안부터 판매 완료까지,
            <br />
            실시간 알림으로 놓치지 마세요
          </p>
        </div>

        <div className="relative flex h-full w-full items-center justify-end">
          <div className="absolute top-[15%] left-0 z-[4] flex w-[400px] flex-col justify-between gap-10">
            <div className="relative flex h-14 w-52 items-center justify-center rounded-2xl bg-sky-500 p-2.5">
              <p className="font-bold text-black">제 포카랑 교환해요 ✋🏻</p>
              <div className="absolute top-[50px] left-[50px] h-0 w-0 border-t-[20px] border-r-[12px] border-l-[12px] border-t-sky-500 border-r-transparent border-l-transparent"></div>
            </div>
            <div className="relative flex w-full items-center justify-end">
              <div className="relative flex h-14 w-72 items-center justify-center rounded-2xl bg-neutral-500 p-2.5">
                <p>[스페인 여행] 포카 사고 싶어요! ⛰</p>
                <div className="absolute top-[50px] right-[50px] h-0 w-0 border-t-[20px] border-r-[12px] border-l-[12px] border-t-neutral-500 border-r-transparent border-l-transparent"></div>
              </div>
            </div>
          </div>

          <div className="relative z-[2] h-[511px] w-full max-w-[754px]">
            <Image
              src={'/images/img-landing-3.webp'}
              alt="포토카드 거래"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1070px) 100vw, 1070px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationSection;
