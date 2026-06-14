"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ─── 공통 스타일 ─── */
const S = {
  section: {
    width: "100%",
    background: "#0F0F0F",
    position: "relative",
    overflow: "hidden",
  },
};

/* ═══════════════════════════════════════════
   메인 페이지
═══════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div style={{ background: "#0F0F0F", minHeight: "100vh", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif" }}>

      {/* ── 1페이지: Hero ── */}
      <HeroSection />

      {/* ── 2페이지: 포인트 거래 ── */}
      <PointSection />

      {/* ── 3페이지: 알림 ── */}
      <NotificationSection />

      {/* ── 4페이지: 랜덤 상자 ── */}
      <RandomBoxSection />

      {/* ── 5페이지: Footer CTA ── */}
      <FooterCTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════
   1페이지 — Hero
═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ ...S.section, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

      {/* 텍스트 영역 */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2, paddingTop: "80px", marginBottom: "48px" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0 0 20px", letterSpacing: "0.08em" }}>최애의포토</p>
        <h1 style={{ color: "#fff", fontSize: "56px", fontWeight: "800", margin: "0 0 4px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          구하기 어려웠던
        </h1>
        <h1 style={{ color: "#EFFF04", fontSize: "56px", fontWeight: "800", margin: "0 0 44px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          나의 최애가 여기에!
        </h1>
        <Link href="/mySales">
          <button style={{
            background: "#EFFF04", color: "#000", border: "none", borderRadius: "8px",
            padding: "18px 56px", fontSize: "16px", fontWeight: "700", cursor: "pointer",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            최애 찾으러 가기
          </button>
        </Link>
      </div>

      {/* 맥북 목업 이미지 */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", justifyContent: "center" }}>
        <Image
          src="/images/landing.png"
          alt="마켓플레이스 미리보기"
          width={1400}
          height={800}
          style={{ width: "100%", maxWidth: "1400px", height: "auto", display: "block" }}
          priority
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2페이지 — 포인트로 안전하게 거래
═══════════════════════════════════════════ */
function PointSection() {
  return (
    <section style={{ ...S.section, minHeight: "900px", display: "flex", alignItems: "center" }}>

      {/* 올리브 블롭 */}
      <div style={{
        position: "absolute", right: "10%", bottom: "-100px",
        width: "560px", height: "560px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(120,140,0,0.2) 0%, rgba(80,100,0,0.06) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1920px", width: "100%", margin: "0 auto", padding: "0 80px", display: "flex", alignItems: "center", gap: "60px", boxSizing: "border-box" }}>

        {/* 좌측 */}
        <div style={{ flexShrink: 0, width: "400px" }}>
          <h2 style={{ color: "#fff", fontSize: "42px", fontWeight: "800", lineHeight: 1.25, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            포인트로<br /><span style={{ color: "#EFFF04" }}>안전하게</span> 거래하세요
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.8, margin: "0 0 60px" }}>
            내 포토카드를 포인트로 팔고, 원하는<br />포토카드를 포인트로 안전하게 교환하세요
          </p>

          {/* 유저 칩 + 플로팅 포인트 */}
          <div style={{ position: "relative", height: "180px" }}>
            <style>{`
              @keyframes floatUp {
                0%   { transform: translateY(0px); opacity: 1; }
                80%  { opacity: 0.8; }
                100% { transform: translateY(-160px); opacity: 0; }
              }
            `}</style>
            {/* 유저 칩 */}
            <div style={{
              position: "absolute", top: "50px", left: "80px",
              background: "rgba(50,50,50,0.95)", borderRadius: "999px",
              padding: "16px 28px", display: "flex", alignItems: "center", gap: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 2,
            }}>
              <span style={{ color: "#EFFF04", fontSize: "20px", fontWeight: "800" }}>1,540 P</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "18px" }}>🔔</span>
              <span style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>유디</span>
            </div>
            {/* 플로팅 포인트들 */}
            {[
              { val: "+40 P", left: "30px", top: "0px", delay: "0s",   size: "22px", opacity: 1 },
              { val: "+40 P", left: "30px", top: "60px", delay: "1s",  size: "18px", opacity: 0.65 },
              { val: "+28 P", left: "30px", top: "100px", delay: "0.5s", size: "15px", opacity: 0.4 },
              { val: "+12 P", left: "30px", top: "130px", delay: "1.5s", size: "12px", opacity: 0.25 },
            ].map(({ val, left, top, delay, size, opacity }) => (
              <div key={val + top} style={{
                position: "absolute", left, top,
                color: "#EFFF04", fontSize: size, fontWeight: "800",
                opacity,
                animation: `floatUp 3s ease-in ${delay} infinite`,
              }}>{val}</div>
            ))}
          </div>
        </div>

        {/* 우측: 디바이스 목업 */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "600px", background: "#111",
            borderRadius: "16px", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          }}>
            {/* 헤더 */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#fff", fontWeight: "800", fontSize: "13px" }}>최애<span style={{ color: "#EFFF04" }}>의</span>포토</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>1,540 P ● 유디 | 로그아웃</span>
            </div>
            {/* 본문 */}
            <div style={{ padding: "24px", display: "flex", gap: "24px" }}>
              {/* 포토카드 이미지 */}
              <div style={{ width: "240px", height: "240px", flexShrink: 0, borderRadius: "8px", background: "url(/images/img-image3.png) 50%/cover no-repeat" }} />
              {/* 상세 */}
              <div style={{ flex: 1 }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: "0 0 6px" }}>마켓플레이스</p>
                <h3 style={{ color: "#fff", fontSize: "22px", fontWeight: "800", margin: "0 0 14px" }}>우리집 앞마당</h3>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "12px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ color: "#FF7B00", fontSize: "12px", fontWeight: "700" }}>LEGENDARY</span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>팬미팅</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", lineHeight: 1.6, margin: "0 0 16px" }}>
                  우리집 앞마당 포토카드입니다.<br />우리집 앞마당 포토카드입니다.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  {[["가격","500 P"],["잔여","1 / 1"]].map(([k,v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{k}</span>
                      <span style={{ color: "#fff", fontWeight: "700", fontSize: "12px" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: "100%", background: "#EFFF04", color: "#000", border: "none", borderRadius: "6px", padding: "12px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
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

function NotificationSection() {
  return (
    <section style={{ ...S.section, minHeight: "900px", display: "flex", alignItems: "center" }}>

      {/* 민트 블롭 */}
      <div style={{
        position: "absolute", left: "50%", bottom: "-60px", transform: "translateX(-50%)",
        width: "700px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,200,180,0.18) 0%, rgba(0,180,160,0.05) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1920px", width: "100%", margin: "0 auto", padding: "0 80px", display: "flex", alignItems: "center", gap: "60px", boxSizing: "border-box" }}>

        {/* 좌측 */}
        <div style={{ flexShrink: 0, width: "360px" }}>
          <h2 style={{ color: "#fff", fontSize: "42px", fontWeight: "800", lineHeight: 1.25, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            알림으로 보다<br /><span style={{ color: "#EFFF04" }}>빨라진</span> 거래
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.8, margin: "0 0 52px" }}>
            모희 제안부터 구매 알림까지,<br />실시간 알림으로 놓치지 마세요
          </p>
          {/* 채팅 버블 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {["제 포카 교환해요 ↓", "[스페인 여행] 포카 사고 싶어요 ↓"].map((msg, i) => (
              <div key={i} style={{
                display: "inline-block", alignSelf: "flex-start",
                background: "#1E88E5", color: "#fff",
                borderRadius: "20px 20px 20px 4px",
                padding: "12px 20px", fontSize: "14px", fontWeight: "600",
                boxShadow: "0 4px 16px rgba(30,136,229,0.3)",
                opacity: i === 0 ? 1 : 0.75,
              }}>{msg}</div>
            ))}
          </div>
        </div>

        {/* 우측: 디바이스 목업 */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}>
          {/* 🔔 뱃지 */}
          <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
            <div style={{ position: "relative", width: "54px", height: "54px" }}>
              <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#1a1a1a", border: "3px solid #EFFF04", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🔔</div>
              <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "22px", height: "22px", borderRadius: "50%", background: "#EFFF04", color: "#000", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
            </div>
          </div>

          <div style={{
            width: "700px", background: "#111",
            borderRadius: "16px", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          }}>
            {/* 헤더 */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#fff", fontWeight: "800", fontSize: "13px" }}>최애<span style={{ color: "#EFFF04" }}>의</span>포토</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>1,540 P ● 유디 | 로그아웃</span>
            </div>
            {/* 본문 */}
            <div style={{ display: "flex", minHeight: "460px" }}>
              {/* 마켓 (어둡게) */}
              <div style={{ flex: 1, padding: "20px", opacity: 0.3 }}>
                <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "800", margin: "0 0 16px" }}>마켓플레이스</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {["/images/img-image3.png", "/images/img-image2.png"].map((img, i) => (
                    <div key={i} style={{ height: "110px", background: `url(${img}) 50%/cover no-repeat`, borderRadius: "6px" }} />
                  ))}
                </div>
              </div>
              {/* 알림 패널 */}
              <div style={{ width: "340px", flexShrink: 0, background: "#1c1c1c", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                {NOTIFICATIONS.map((text, i) => (
                  <div key={i} style={{ padding: "20px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ color: "#fff", fontSize: "13px", fontWeight: "500", lineHeight: 1.6, margin: "0 0 6px" }}>{text}</p>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>1시간 전</span>
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
function RandomBoxSection() {
  const [time, setTime] = useState({ m: 59, s: 59 });
  const [openedIdx, setOpenedIdx] = useState(null);   // 클릭한 상자 index
  const [earnedPoint, setEarnedPoint] = useState(null); // 획득 포인트

  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        // 타이머 리셋 시 상자도 초기화
        setOpenedIdx(null);
        setEarnedPoint(null);
        return { m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, "0");

  const handleBoxClick = (i) => {
    if (openedIdx !== null) return; // 이미 열었으면 무시
    const point = (Math.floor(Math.random() * 10) + 1) * 50; // 50~500P
    setOpenedIdx(i);
    setEarnedPoint(point);
  };

  const BOXES = [
    { ribbon: "#60B8FF", bow: "🎀", shadow: "rgba(96,184,255,0.5)" },
    { ribbon: "#A855F7", bow: "🎗️", shadow: "rgba(168,85,247,0.5)" },
    { ribbon: "#FF6EB4", bow: "🎀", shadow: "rgba(255,110,180,0.5)" },
  ];

  return (
    <section style={{ ...S.section, minHeight: "900px", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "160px" }}>

      {/* 올리브/초록 블롭 — 왼쪽 하단 */}
      <div style={{
        position: "absolute", left: "-100px", bottom: "0px",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(90,120,0,0.35) 0%, rgba(60,90,0,0.12) 50%, transparent 75%)",
        pointerEvents: "none",
      }} />

      {/* 우측 장식 선물상자 */}
      <div style={{ position: "absolute", right: "40px", bottom: "80px", fontSize: "80px", opacity: 0.5, transform: "rotate(15deg)", pointerEvents: "none" }}>🎁</div>
      <div style={{ position: "absolute", right: "160px", bottom: "40px", fontSize: "50px", opacity: 0.3, transform: "rotate(-10deg)", pointerEvents: "none" }}>🎀</div>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.3) translateY(20px); opacity: 0; }
          60%  { transform: scale(1.15) translateY(-6px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes boxShake {
          0%,100% { transform: rotate(0deg); }
          20%     { transform: rotate(-8deg); }
          40%     { transform: rotate(8deg); }
          60%     { transform: rotate(-5deg); }
          80%     { transform: rotate(5deg); }
        }
        @keyframes lidFly {
          0%   { transform: translateX(-50%) translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-60px) rotate(-20deg); opacity: 0; }
        }
      `}</style>

      <div style={{ maxWidth: "1920px", width: "100%", margin: "0 auto", padding: "0 80px", boxSizing: "border-box" }}>
        {/* 타이틀 */}
        <h2 style={{ color: "#fff", fontSize: "42px", fontWeight: "800", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
          랜덤 상자로 포인트 받자! 🎉
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.8, margin: "0 0 48px" }}>
          한 시간마다 주어지는 랜덤 상자를 열고,<br />포인트를 쏙쏙쌓으세요
        </p>

        {/* 디바이스 + 모달 래퍼 */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>

          {/* 디바이스 프레임 */}
          <div style={{
            width: "860px",
            background: "#0d0d0d",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* 헤더 */}
            <div style={{ padding: "14px 26px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: "800", fontSize: "13px" }}>최애<span style={{ color: "#EFFF04" }}>의</span>포토</span>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>1,540 P</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>⊙</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>유디</span>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>로그아웃</span>
              </div>
            </div>

            {/* 마켓 배경 (흐리게) */}
            <div style={{ padding: "20px 26px", opacity: 0.15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "800", margin: 0 }}>마켓플레이스</h3>
                <div style={{ background: "#EFFF04", color: "#000", borderRadius: "6px", padding: "7px 16px", fontSize: "11px", fontWeight: "700" }}>나의 포토카드 판매하기</div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "7px 12px", color: "rgba(255,255,255,0.3)", fontSize: "11px", width: "140px" }}>검색</div>
                {["등급","장르","매진여부"].map(f => (
                  <div key={f} style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "4px", padding: "7px 10px", color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{f} ▾</div>
                ))}
              </div>
              <div style={{ height: "60px" }} />
            </div>

            {/* 딤 오버레이 */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />

            {/* 모달 */}
            <div style={{
              position: "absolute",
              top: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 60px)",
              background: "#111",
              border: "2px solid #EFFF04",
              borderRadius: "12px",
              padding: "36px 48px 0",
              textAlign: "center",
              zIndex: 10,
              overflow: "visible",
            }}>
              {/* 닫기 */}
              <button style={{ position: "absolute", top: "14px", right: "18px", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "18px", cursor: "pointer" }}>✕</button>

              {/* 제목 */}
              <h3 style={{ fontSize: "44px", fontWeight: "900", margin: "0 0 22px", letterSpacing: "-0.02em" }}>
                <span style={{ color: "#fff" }}>랜덤</span>
                <span style={{ color: "#EFFF04" }}>포인트</span>
              </h3>

              <p style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>1시간마다 돌아오는 기회!</p>
              <p style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 16px" }}>랜덤 상자 뽑기를 통해 포인트를 획득하세요!</p>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: "0 0 36px" }}>
                다음 기회까지 남은 시간&nbsp;
                <span style={{ color: "#EFFF04", fontWeight: "700" }}>{pad(time.m)}분 {pad(time.s)}초</span>
              </p>

              {/* 선물상자 — 아래로 삐져나옴 */}
              <div style={{ display: "flex", justifyContent: "center", gap: "40px", position: "relative", zIndex: 20 }}>
                {BOXES.map(({ ribbon, bow, shadow }, i) => {
                  const isOpened = openedIdx === i;
                  const isDisabled = openedIdx !== null && !isOpened;

                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                      {/* 상자 or 포인트 결과 */}
                      {isOpened ? (
                        /* ── 열린 상자: 포인트 결과 표시 ── */
                        <div style={{
                          width: "120px", height: "130px",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
                        }}>
                          <div style={{ fontSize: "32px", marginBottom: "6px" }}>🎉</div>
                          <div style={{
                            color: "#EFFF04", fontSize: "28px", fontWeight: "900",
                            letterSpacing: "-0.02em", lineHeight: 1.1,
                          }}>
                            +{earnedPoint} P
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "4px" }}>
                            획득!
                          </div>
                        </div>
                      ) : (
                        /* ── 닫힌 상자 ── */
                        <div
                          onClick={() => handleBoxClick(i)}
                          style={{
                            width: "120px", height: "130px", position: "relative",
                            filter: isDisabled
                              ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3)) grayscale(0.6) brightness(0.5)"
                              : `drop-shadow(0 16px 32px ${shadow})`,
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            transition: "filter 0.3s, transform 0.15s",
                            animation: !isDisabled && openedIdx === null ? `boxShake 2s ease-in-out ${i * 0.4}s infinite` : "none",
                          }}
                          onMouseEnter={e => { if (!isDisabled) e.currentTarget.style.transform = "scale(1.08) translateY(-4px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}
                        >
                          {/* 상자 본체 */}
                          <div style={{ position: "absolute", bottom: 0, width: "120px", height: "100px", background: "linear-gradient(160deg,#D6EC00,#AABC00)", borderRadius: "10px" }}>
                            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: "20px", height: "100%", background: ribbon, borderRadius: "2px" }} />
                            <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", height: "20px", background: ribbon, borderRadius: "2px" }} />
                          </div>
                          {/* 뚜껑 */}
                          <div style={{ position: "absolute", top: 0, left: "-4px", width: "128px", height: "30px", background: "linear-gradient(160deg,#E2F200,#BECE00)", borderRadius: "8px", zIndex: 2 }}>
                            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: "20px", height: "100%", background: ribbon, borderRadius: "2px" }} />
                          </div>
                          {/* 리본 나비 */}
                          <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontSize: "30px" }}>{bow}</div>
                        </div>
                      )}

                      {/* 받침 그림자 */}
                      <div style={{
                        width: "140px", height: "14px",
                        background: isDisabled ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.3)",
                        borderRadius: "50%", marginTop: "6px", filter: "blur(4px)",
                        transition: "background 0.3s",
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 모달 하단 삐져나오는 공간 */}
            <div style={{ height: "300px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5페이지 — Footer CTA
═══════════════════════════════════════════ */
function FooterCTASection() {
  return (
    <section style={{
      ...S.section,
      minHeight: "420px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "80px 0",
    }}>
      {/* 폴라로이드 스타일 카드 */}
      <div style={{
        background: "#fff",
        padding: "10px 10px 36px",
        borderRadius: "4px",
        marginBottom: "40px",
        transform: "rotate(12deg)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        width: "160px",
        flexShrink: 0,
      }}>
        <Image
          src="/images/art3.jpg"
          alt="최애의포토"
          width={140}
          height={140}
          style={{ objectFit: "cover", display: "block" }}
        />
      </div>

      <h2 style={{
        color: "#fff", fontSize: "40px", fontWeight: "800",
        margin: "0 0 36px", letterSpacing: "-0.02em", textAlign: "center",
      }}>
        나의 최애를 지금 찾아보세요!
      </h2>

      <Link href="/mySales">
        <button style={{
          background: "#EFFF04", color: "#000", border: "none",
          borderRadius: "8px", padding: "18px 64px",
          fontSize: "16px", fontWeight: "700", cursor: "pointer",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          최애 찾으러 가기
        </button>
      </Link>
    </section>
  );
}
