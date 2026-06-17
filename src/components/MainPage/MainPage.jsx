"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <PointSection />
      <NotificationSection />
      <RandomBoxSection />
      <FooterCTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════
   1페이지 — Hero
═══════════════════════════════════════════ */
const HeroSection = () => {
  return (
    <section className="w-full bg-black relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="text-center relative z-[2] pt-20 mb-12">
        <p className="text-white/50 text-sm mb-5 tracking-[0.08em]">최애의포토</p>
        <h1 className="text-white text-[56px] font-extrabold mb-1 leading-[1.15] tracking-[-0.02em]">
          구하기 어려웠던
        </h1>
        <h1 className="text-main text-[56px] font-extrabold mb-11 leading-[1.15] tracking-[-0.02em]">
          나의 최애가 여기에!
        </h1>
        <Link href="/mySales">
          <button className="bg-main text-black border-none rounded-lg py-[18px] px-14 text-base font-bold cursor-pointer transition-opacity duration-200 hover:opacity-85">
            최애 찾으러 가기
          </button>
        </Link>
      </div>

      <div className="relative z-[2] w-full flex justify-center">
        <Image
          src="/images/landing.png"
          alt="마켓플레이스 미리보기"
          width={1400}
          height={800}
          className="w-full max-w-[1400px] h-auto block"
          priority
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2페이지 — 포인트로 안전하게 거래
═══════════════════════════════════════════ */
const PointSection = () => {
  return (
    <section className="w-full bg-black relative overflow-hidden min-h-[900px] flex items-center">
      {/* 올리브 블롭 */}
      <div className="absolute right-[10%] bottom-[-100px] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(120,140,0,0.2)_0%,rgba(80,100,0,0.06)_55%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1920px] w-full mx-auto px-20 flex items-center gap-[60px] box-border">
        {/* 좌측 */}
        <div className="shrink-0 w-[400px]">
          <h2 className="text-white text-[42px] font-extrabold leading-tight mb-4 tracking-[-0.02em]">
            포인트로<br /><span className="text-main">안전하게</span> 거래하세요
          </h2>
          <p className="text-white/45 text-[15px] leading-[1.8] mb-[60px]">
            내 포토카드를 포인트로 팔고, 원하는<br />포토카드를 포인트로 안전하게 교환하세요
          </p>

          {/* 유저 칩 + 플로팅 포인트 */}
          <div className="relative h-[180px]">
            {/* 유저 칩 */}
            <div className="absolute top-[50px] left-20 bg-[rgba(50,50,50,0.95)] rounded-full py-4 px-7 flex items-center gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[2]">
              <span className="text-main text-xl font-extrabold">1,540 P</span>
              <span className="text-white/40 text-lg">🔔</span>
              <span className="text-white text-xl font-bold">유디</span>
            </div>
            {/* 플로팅 포인트들 */}
            {[
              { val: "+40 P", left: "30px", top: "0px",   delay: "0s",   size: "22px", opacity: 1    },
              { val: "+40 P", left: "30px", top: "60px",  delay: "1s",   size: "18px", opacity: 0.65 },
              { val: "+28 P", left: "30px", top: "100px", delay: "0.5s", size: "15px", opacity: 0.4  },
              { val: "+12 P", left: "30px", top: "130px", delay: "1.5s", size: "12px", opacity: 0.25 },
            ].map(({ val, left, top, delay, size, opacity }) => (
              <div
                key={val + top}
                style={{ "--left": left, "--top": top, "--size": size, "--opacity": opacity, "--delay": delay }}
                className={`absolute text-main font-extrabold animate-[floatUp_3s_ease-in_infinite] ${styles.floatingPoint}`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 디바이스 목업 */}
        <div className="flex-1 flex justify-center">
          <div className="w-[600px] bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            {/* 헤더 */}
            <div className="py-4 px-6 border-b border-white/[0.07] flex justify-between">
              <span className="text-white font-extrabold text-[13px]">최애<span className="text-main">의</span>포토</span>
              <span className="text-white/40 text-[11px]">1,540 P ● 유디 | 로그아웃</span>
            </div>
            {/* 본문 */}
            <div className="p-6 flex gap-6">
              {/* 포토카드 이미지 */}
              <div className="w-[240px] h-[240px] shrink-0 rounded-lg bg-[url(/images/img-image3.png)] bg-center bg-cover bg-no-repeat" />
              {/* 상세 */}
              <div className="flex-1">
                <p className="text-white/40 text-[11px] mb-1.5">마켓플레이스</p>
                <h3 className="text-white text-[22px] font-extrabold mb-3.5">우리집 앞마당</h3>
                <div className="h-px bg-white/10 mb-3" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#FF7B00] text-xs font-bold">LEGENDARY</span>
                  <span className="text-white/20">|</span>
                  <span className="text-white/50 text-xs">팬미팅</span>
                </div>
                <p className="text-white/40 text-xs leading-[1.6] mb-4">
                  우리집 앞마당 포토카드입니다.<br />우리집 앞마당 포토카드입니다.
                </p>
                <div className="flex flex-col gap-2 mb-4">
                  {[["가격", "500 P"], ["잔여", "1 / 1"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-white/40 text-xs">{k}</span>
                      <span className="text-white font-bold text-xs">{v}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-main text-black border-none rounded-md py-3 text-[13px] font-bold cursor-pointer">
                  포토카드 구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3페이지 — 알림으로 보다 빨라진 거래
═══════════════════════════════════════════ */
const NOTIFICATIONS = [
  "기며누님이 [RARE | 우리집 앞마당]을 1장 구매했습니다.",
  "예진쓰님이 [COMMON | 스페인 여행]의 포토카드 교환을 제안했습니다.",
  "[LEGENDARY | 우리집 앞마당]이 품절되었습니다.",
  "예진쓰님과의 [COMMON | 스페인 여행]의 포토카드 교환이 성사되었습니다.",
];

const NotificationSection = () => {
  return (
    <section className="w-full bg-black relative overflow-hidden min-h-[900px] flex items-center">
      {/* 민트 블롭 */}
      <div className="absolute left-1/2 bottom-[-60px] -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(0,200,180,0.18)_0%,rgba(0,180,160,0.05)_55%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1920px] w-full mx-auto px-20 flex items-center gap-[60px] box-border">
        {/* 좌측 */}
        <div className="shrink-0 w-[360px]">
          <h2 className="text-white text-[42px] font-extrabold leading-tight mb-4 tracking-[-0.02em]">
            알림으로 보다<br /><span className="text-main">빨라진</span> 거래
          </h2>
          <p className="text-white/45 text-[15px] leading-[1.8] mb-[52px]">
            모희 제안부터 구매 알림까지,<br />실시간 알림으로 놓치지 마세요
          </p>
          {/* 채팅 버블 */}
          <div className="flex flex-col gap-3">
            {["제 포카 교환해요 ↓", "[스페인 여행] 포카 사고 싶어요 ↓"].map((msg, i) => (
              <div
                key={i}
                className={`inline-block self-start bg-[#1E88E5] text-white rounded-[20px_20px_20px_4px] py-3 px-5 text-sm font-semibold shadow-[0_4px_16px_rgba(30,136,229,0.3)] ${i > 0 ? "opacity-75" : ""}`}
              >
                {msg}
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 디바이스 목업 */}
        <div className="flex-1 flex justify-center relative">
          {/* 🔔 뱃지 */}
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-10">
            <div className="relative w-[54px] h-[54px]">
              <div className="w-[54px] h-[54px] rounded-full bg-[#1a1a1a] border-[3px] border-main flex items-center justify-center text-[24px]">🔔</div>
              <div className="absolute top-[-4px] right-[-4px] w-[22px] h-[22px] rounded-full bg-main text-black text-[11px] font-extrabold flex items-center justify-center">3</div>
            </div>
          </div>

          <div className="w-[700px] bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            {/* 헤더 */}
            <div className="py-4 px-6 border-b border-white/[0.07] flex justify-between">
              <span className="text-white font-extrabold text-[13px]">최애<span className="text-main">의</span>포토</span>
              <span className="text-white/40 text-[11px]">1,540 P ● 유디 | 로그아웃</span>
            </div>
            {/* 본문 */}
            <div className="flex min-h-[460px]">
              {/* 마켓 (어둡게) */}
              <div className="flex-1 p-5 opacity-30">
                <h3 className="text-white text-lg font-extrabold mb-4">마켓플레이스</h3>
                <div className="grid grid-cols-2 gap-[10px]">
                  {["/images/img-image3.png", "/images/img-image2.png"].map((img, i) => (
                    <div
                      key={i}
                      style={{ "--bg-url": `url(${img})` }}
                      className={`h-[110px] bg-center bg-cover bg-no-repeat rounded-[6px] ${styles.notifImage}`}
                    />
                  ))}
                </div>
              </div>
              {/* 알림 패널 */}
              <div className="w-[340px] shrink-0 bg-[#1c1c1c] border-l border-white/[0.06]">
                {NOTIFICATIONS.map((text, i) => (
                  <div key={i} className="py-5 px-[22px] border-b border-white/5">
                    <p className="text-white text-[13px] font-medium leading-[1.6] mb-1.5">{text}</p>
                    <span className="text-white/30 text-[11px]">1시간 전</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4페이지 — 랜덤 상자로 포인트 받자!
═══════════════════════════════════════════ */
const BOXES = [
  { ribbonClass: "bg-[#60B8FF]", bow: "🎀", shadow: "rgba(96,184,255,0.5)"  },
  { ribbonClass: "bg-[#A855F7]", bow: "🎗️", shadow: "rgba(168,85,247,0.5)" },
  { ribbonClass: "bg-[#FF6EB4]", bow: "🎀", shadow: "rgba(255,110,180,0.5)" },
];

const RandomBoxSection = () => {
  const [time, setTime] = useState({ m: 59, s: 59 });
  const [openedIdx, setOpenedIdx] = useState(null);
  const [earnedPoint, setEarnedPoint] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        setOpenedIdx(null);
        setEarnedPoint(null);
        return { m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, "0");

  const handleBoxClick = (i) => {
    if (openedIdx !== null) return;
    const point = (Math.floor(Math.random() * 10) + 1) * 50;
    setOpenedIdx(i);
    setEarnedPoint(point);
  };

  return (
    <section className="w-full bg-black relative overflow-hidden min-h-[900px] flex flex-col justify-center pb-40">
      {/* 올리브/초록 블롭 */}
      <div className="absolute left-[-100px] bottom-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(90,120,0,0.35)_0%,rgba(60,90,0,0.12)_50%,transparent_75%)] pointer-events-none" />

      {/* 우측 장식 선물상자 */}
      <div className="absolute right-10 bottom-20 text-[80px] opacity-50 rotate-[15deg] pointer-events-none">🎁</div>
      <div className="absolute right-40 bottom-10 text-[50px] opacity-30 rotate-[-10deg] pointer-events-none">🎀</div>

      <div className="max-w-[1920px] w-full mx-auto px-20 box-border">
        {/* 타이틀 */}
        <h2 className="text-white text-[42px] font-extrabold mb-3.5 tracking-[-0.02em]">
          랜덤 상자로 포인트 받자! 🎉
        </h2>
        <p className="text-white/45 text-[15px] leading-[1.8] mb-12">
          한 시간마다 주어지는 랜덤 상자를 열고,<br />포인트를 쏙쏙쌓으세요
        </p>

        {/* 디바이스 + 모달 래퍼 */}
        <div className="flex justify-center relative">
          {/* 디바이스 프레임 */}
          <div className="w-[860px] bg-[#0d0d0d] rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden relative">
            {/* 헤더 */}
            <div className="py-[14px] px-[26px] border-b border-white/[0.07] flex justify-between items-center">
              <span className="text-white font-extrabold text-[13px]">최애<span className="text-main">의</span>포토</span>
              <div className="flex gap-[14px] items-center">
                <span className="text-white/50 text-[11px]">1,540 P</span>
                <span className="text-white/40">⊙</span>
                <span className="text-white/70 text-[11px]">유디</span>
                <span className="text-white/20 text-[11px]">로그아웃</span>
              </div>
            </div>

            {/* 마켓 배경 (흐리게) */}
            <div className="py-5 px-[26px] opacity-[0.15]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-extrabold">마켓플레이스</h3>
                <div className="bg-main text-black rounded-md py-[7px] px-4 text-[11px] font-bold">나의 포토카드 판매하기</div>
              </div>
              <div className="flex gap-2 mb-3.5">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-md py-[7px] px-3 text-white/30 text-[11px] w-[140px]">검색</div>
                {["등급", "장르", "매진여부"].map(f => (
                  <div key={f} className="border border-white/[0.12] rounded-[4px] py-[7px] px-[10px] text-white/30 text-[11px]">{f} ▾</div>
                ))}
              </div>
              <div className="h-[60px]" />
            </div>

            {/* 딤 오버레이 */}
            <div className="absolute inset-0 bg-black/50" />

            {/* 모달 */}
            <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[calc(100%-60px)] bg-[#111] border-2 border-main rounded-xl pt-9 px-12 pb-0 text-center z-10 overflow-visible">
              {/* 닫기 */}
              <button className="absolute top-3.5 right-[18px] bg-transparent border-none text-white/50 text-lg cursor-pointer">✕</button>

              {/* 제목 */}
              <h3 className="text-[44px] font-black mb-[22px] tracking-[-0.02em]">
                <span className="text-white">랜덤</span>
                <span className="text-main">포인트</span>
              </h3>

              <p className="text-white text-base font-bold mb-1">1시간마다 돌아오는 기회!</p>
              <p className="text-white text-base font-bold mb-4">랜덤 상자 뽑기를 통해 포인트를 획득하세요!</p>

              <p className="text-white/50 text-[13px] mb-9">
                다음 기회까지 남은 시간&nbsp;
                <span className="text-main font-bold">{pad(time.m)}분 {pad(time.s)}초</span>
              </p>

              {/* 선물상자 */}
              <div className="flex justify-center gap-10 relative z-20">
                {BOXES.map(({ ribbonClass, bow, shadow }, i) => {
                  const isOpened   = openedIdx === i;
                  const isDisabled = openedIdx !== null && !isOpened;

                  return (
                    <div key={i} className="flex flex-col items-center">
                      {isOpened ? (
                        /* ── 열린 상자: 포인트 결과 ── */
                        <div className="w-[120px] h-[130px] flex flex-col items-center justify-center animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                          <div className="text-[32px] mb-1.5">🎉</div>
                          <div className="text-main text-[28px] font-black tracking-[-0.02em] leading-[1.1]">
                            +{earnedPoint} P
                          </div>
                          <div className="text-white/50 text-[11px] mt-1">획득!</div>
                        </div>
                      ) : (
                        /* ── 닫힌 상자 ── */
                        <div
                          onClick={() => handleBoxClick(i)}
                          style={{ "--glow-color": shadow, "--anim-delay": `${i * 0.4}s` }}
                          className={`${styles.box} ${
                            isDisabled
                              ? styles.boxDisabled
                              : openedIdx === null
                                ? `${styles.boxActive} ${styles.boxShaking}`
                                : styles.boxActive
                          }`}
                        >
                          {/* 상자 본체 */}
                          <div className="absolute bottom-0 w-[120px] h-[100px] bg-[linear-gradient(160deg,#D6EC00,#AABC00)] rounded-[10px]">
                            <div className={`absolute left-1/2 -translate-x-1/2 w-5 h-full ${ribbonClass} rounded-[2px]`} />
                            <div className={`absolute top-1/2 -translate-y-1/2 w-full h-5 ${ribbonClass} rounded-[2px]`} />
                          </div>
                          {/* 뚜껑 */}
                          <div className="absolute top-0 left-[-4px] w-[128px] h-[30px] bg-[linear-gradient(160deg,#E2F200,#BECE00)] rounded-lg z-[2]">
                            <div className={`absolute left-1/2 -translate-x-1/2 w-5 h-full ${ribbonClass} rounded-[2px]`} />
                          </div>
                          {/* 리본 나비 */}
                          <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 z-[3] text-[30px]">{bow}</div>
                        </div>
                      )}

                      {/* 받침 그림자 */}
                      <div className={`w-[140px] h-3.5 rounded-full mt-1.5 blur-sm transition-colors duration-300 ${isDisabled ? "bg-black/10" : "bg-black/30"}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 모달 하단 삐져나오는 공간 */}
            <div className="h-[300px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5페이지 — Footer CTA
═══════════════════════════════════════════ */
const FooterCTASection = () => {
  return (
    <section className="w-full bg-black relative overflow-hidden min-h-[420px] flex flex-col items-center justify-center border-t border-white/[0.06] py-20">
      {/* 폴라로이드 스타일 카드 */}
      <div className="bg-white pt-[10px] px-[10px] pb-9 rounded-[4px] mb-10 rotate-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-40 shrink-0">
        <Image
          src="/images/art3.jpg"
          alt="최애의포토"
          width={140}
          height={140}
          className="object-cover block"
        />
      </div>

      <h2 className="text-white text-[40px] font-extrabold mb-9 tracking-[-0.02em] text-center">
        나의 최애를 지금 찾아보세요!
      </h2>

      <Link href="/mySales">
        <button className="bg-main text-black border-none rounded-lg py-[18px] px-16 text-base font-bold cursor-pointer transition-opacity duration-200 hover:opacity-85">
          최애 찾으러 가기
        </button>
      </Link>
    </section>
  );
};

export default MainPage;
