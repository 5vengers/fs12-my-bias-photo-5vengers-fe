"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { getMyMarketItems } from "@/libs/marketApi";

/* ─── 등급 ─── */
const GRADE_LABEL = {
  COMMON:     "COMMON",
  RARE:       "RARE",
  SUPER_RARE: "SUPER RARE",
  LEGENDARY:  "LEGENDARY",
};

const GRADE_STYLE = {
  COMMON:     { text: "#EFFF04", border: "#EFFF04" },
  RARE:       { text: "#00D1FF", border: "#00D1FF" },
  SUPER_RARE: { text: "#9B7FE8", border: "#9B7FE8" },
  LEGENDARY:  { text: "#FF7B00", border: "#FF7B00" },
};

/* ─── 장르 ─── */
const GENRE_LABEL = {
  ALBUM:           "앨범",
  BENEFIT:         "특전",
  FANSIGN:         "팬싸",
  SEASON_GREETING: "시즌그리팅",
  FAN_MEETING:     "팬미팅",
  CONCERT:         "콘서트",
  MD:              "MD",
  COLLAB:          "콜라보",
  FAN_CLUB:        "팬클럽",
  ETC:             "기타",
};

/* ─── 판매방법 ─── */
const SALE_TYPE_LABEL = {
  INSTANT: "즉시구매",
  AUCTION: "경매",
};

/* ─── NEW 뱃지 기준: 7일 이내 등록 ─── */
function isNewCard(createdAt) {
  if (!createdAt) return false;
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

/* ─── 가격 포맷 (포인트 단위) ─── */
function formatPrice(price) {
  if (price == null) return "-";
  return `${Number(price).toLocaleString()}P`;
}

const FILTER_OPTIONS = {
  등급:    ["전체", ...Object.keys(GRADE_LABEL)],
  장르:    ["전체", ...Object.keys(GENRE_LABEL)],
  판매방법: ["전체", "INSTANT", "AUCTION"],
  매진여부: ["전체", "판매중", "판매완료"],
};

/* ─── 드롭다운 필터 ─── */
function DropdownFilter({ label, options, value, onChange, displayMap }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFiltered = value !== "전체";
  const displayValue = displayMap?.[value] ?? value;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "7px 14px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "4px",
          color: isFiltered ? "#EFFF04" : "rgba(255,255,255,0.7)",
          fontSize: "13px",
          fontWeight: isFiltered ? "600" : "400",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "border-color 0.15s",
        }}
      >
        {label}
        {isFiltered && <span style={{ fontSize: "11px" }}>({displayValue})</span>}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{ opacity: 0.5, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          minWidth: "140px", background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "6px", overflow: "hidden", zIndex: 50,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "9px 16px",
                background: value === opt ? "rgba(239,255,4,0.08)" : "transparent",
                color: value === opt ? "#EFFF04" : "rgba(255,255,255,0.7)",
                fontSize: "13px",
                fontWeight: value === opt ? "600" : "400",
                cursor: "pointer", border: "none", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (value !== opt) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = value === opt ? "rgba(239,255,4,0.08)" : "transparent"; }}
            >
              {displayMap?.[opt] ?? opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── 로딩 스켈레톤 ─── */
function CardSkeleton() {
  return (
    <div style={{ background: "#111", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ width: "100%", height: "170px", background: "rgba(255,255,255,0.05)", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ padding: "12px 14px" }}>
        <div style={{ height: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", marginBottom: "8px", width: "65%" }} />
        <div style={{ height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", width: "45%" }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

/* ─── 카드 컴포넌트 ─── */
function SaleCard({ card }) {
  const gradeStyle = GRADE_STYLE[card.grade] ?? { text: "#fff", border: "#fff" };
  const isSoldOut  = card.status === "SOLD_OUT";
  const isNew      = isNewCard(card.createdAt);
  const remaining  = Math.max(0, (card.quantity ?? 0) - (card.soldQuantity ?? 0));
  const cardName   = card.myCard?.photoCard?.name ?? `카드 #${card.id}`;
  const imageUrl   = card.myCard?.photoCard?.imageUrl ?? null;
  const saleType   = card.saleType ?? "INSTANT";

  return (
    <div
      className="border border-white/10 hover:border-white/25 transition-all flex flex-col"
      style={{ background: "#111", borderRadius: "8px", overflow: "hidden", boxSizing: "border-box", cursor: "pointer" }}
    >
      {/* 이미지 영역 */}
      <div
        style={{
          width: "100%", height: "170px", position: "relative", flexShrink: 0,
          background: imageUrl
            ? `url(${imageUrl}) lightgray 50% / cover no-repeat`
            : "rgba(255,255,255,0.05)",
        }}
      >
        {/* NEW 뱃지 */}
        {isNew && !isSoldOut && (
          <div style={{
            position: "absolute", top: "8px", left: "8px",
            background: "#EFFF04", color: "#000",
            fontSize: "10px", fontWeight: "800",
            padding: "2px 7px", borderRadius: "2px",
            letterSpacing: "0.05em",
          }}>
            NEW
          </div>
        )}

        {/* SOLD OUT 오버레이 */}
        {isSoldOut && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              border: "3px solid #ef4444",
              background: "rgba(239,68,68,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: "rotate(-20deg)",
            }}>
              <span style={{ color: "#ef4444", fontWeight: "900", fontSize: "12px", lineHeight: 1.2, textAlign: "center" }}>
                SOLD<br />OUT
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 카드 정보 */}
      <div style={{ padding: "12px 14px" }}>
        {/* 카드명 */}
        <h3 className="text-white font-bold truncate" style={{ fontSize: "14px", marginBottom: "6px" }}>
          {cardName}
        </h3>

        {/* 등급 | 장르 + 판매방법 */}
        <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
          <div className="flex items-center" style={{ gap: "5px" }}>
            <span className="font-bold" style={{ color: gradeStyle.text, fontSize: "11px" }}>
              {GRADE_LABEL[card.grade] ?? card.grade}
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>|</span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>
              {GENRE_LABEL[card.genre] ?? card.genre}
            </span>
          </div>
          {!isSoldOut && (
            <span style={{
              fontSize: "10px", fontWeight: "600",
              color: saleType === "AUCTION" ? "#9B7FE8" : "#00D1FF",
            }}>
              {SALE_TYPE_LABEL[saleType] ?? "즉시구매"}
            </span>
          )}
        </div>

        {/* 구분선 */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "8px" }} />

        {/* 가격 / 잔여 */}
        <div className="flex flex-col" style={{ gap: "4px" }}>
          <div className="flex justify-between">
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>가격</span>
            <span style={{ color: "#fff", fontSize: "11px", fontWeight: "600" }}>
              {formatPrice(card.pricePerCard)}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>잔여</span>
            <span style={{ color: "#fff", fontSize: "11px", fontWeight: "600" }}>
              {remaining}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ─── */
export default function MySalesPage() {
  const { user } = useAuthStore();

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 9;

  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [filterGrade, setFilterGrade]   = useState("전체");
  const [filterGenre, setFilterGenre]   = useState("전체");
  const [filterSaleType, setFilterSaleType] = useState("전체");
  const [filterSoldOut, setFilterSoldOut]   = useState("전체");

  /* ── API 호출 ── */
  useEffect(() => {
    if (!user?.id) { setIsLoading(false); return; }
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMyMarketItems(user.id);
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user?.id]);

  /* ── 등급별 수량 합산 ── */
  const gradeCounts = useMemo(() =>
    cards.reduce((acc, c) => {
      acc[c.grade] = (acc[c.grade] || 0) + (c.quantity ?? 1);
      return acc;
    }, {}),
  [cards]);

  /* ── 총 보유 수량 합산 ── */
  const totalQuantity = useMemo(() =>
    cards.reduce((sum, c) => sum + (c.quantity ?? 1), 0),
  [cards]);

  /* ── 필터링 ── */
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (selectedGrade && card.grade !== selectedGrade) return false;
      if (filterGrade !== "전체" && card.grade !== filterGrade) return false;
      if (filterGenre !== "전체" && card.genre !== filterGenre) return false;
      if (filterSaleType !== "전체") {
        const st = card.saleType ?? "INSTANT";
        if (st !== filterSaleType) return false;
      }
      if (filterSoldOut === "판매중"  && card.status === "SOLD_OUT")  return false;
      if (filterSoldOut === "판매완료" && card.status !== "SOLD_OUT") return false;
      if (searchQuery) {
        const name = card.myCard?.photoCard?.name ?? "";
        if (!name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [cards, selectedGrade, filterGrade, filterGenre, filterSaleType, filterSoldOut, searchQuery]);

  /* ── 페이지네이션 ── */
  const totalPages  = Math.max(1, Math.ceil(filteredCards.length / PAGE_SIZE));
  const pagedCards  = filteredCards.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => { setCurrentPage(1); },
    [filterGrade, filterGenre, filterSaleType, filterSoldOut, selectedGrade, searchQuery]);

  return (
    <div className="min-h-screen w-full" style={{ background: "#0F0F0F" }}>
      <main style={{ maxWidth: "1920px", margin: "0 auto", padding: "40px 220px" }}>

        {/* 타이틀 */}
        <h1 className="text-white text-[28px] font-bold" style={{ marginBottom: "32px" }}>
          나의 판매 포토카드
        </h1>

        {/* 통계 박스 */}
        <div style={{
          width: "650px", minHeight: "95px",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px",
          padding: "14px 20px", display: "flex", flexDirection: "column",
          justifyContent: "space-between", gap: "10px", boxSizing: "border-box",
        }}>
          <span className="text-white/70 text-sm font-medium">
            {user?.nickname ?? "회원"}님이 보유한 포토카드&nbsp;
            <span className="text-white font-bold">(총 {totalQuantity}장)</span>
          </span>
          <div className="flex items-center gap-[10px]">
            {Object.entries(GRADE_STYLE).map(([grade, style]) => {
              const count    = gradeCounts[grade] || 0;
              const isActive = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(isActive ? null : grade)}
                  className="text-xs font-bold transition-all"
                  style={{
                    border: `1px solid ${style.border}`,
                    color: style.text,
                    background: isActive ? `${style.border}25` : "transparent",
                    borderRadius: "4px", padding: "3px 10px",
                    letterSpacing: "0.05em", whiteSpace: "nowrap", cursor: "pointer",
                  }}
                >
                  {GRADE_LABEL[grade]}&nbsp;{count}장
                </button>
              );
            })}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", margin: "40px 0" }} />

        {/* 검색 + 필터 */}
        <div className="flex items-center gap-4 mb-8">
          {/* 검색 */}
          <div className="relative" style={{ width: "260px" }}>
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", background: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px", padding: "8px 40px 8px 14px",
                fontSize: "13px", color: "white", outline: "none", boxSizing: "border-box",
              }}
            />
            <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
              width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 필터 4개 */}
          <DropdownFilter label="등급"    options={FILTER_OPTIONS["등급"]}
            value={filterGrade}    onChange={setFilterGrade}    displayMap={GRADE_LABEL} />
          <DropdownFilter label="장르"    options={FILTER_OPTIONS["장르"]}
            value={filterGenre}    onChange={setFilterGenre}    displayMap={GENRE_LABEL} />
          <DropdownFilter label="판매방법" options={FILTER_OPTIONS["판매방법"]}
            value={filterSaleType} onChange={setFilterSaleType} displayMap={SALE_TYPE_LABEL} />
          <DropdownFilter label="매진여부" options={FILTER_OPTIONS["매진여부"]}
            value={filterSoldOut}  onChange={setFilterSoldOut} />
        </div>

        {/* 에러 */}
        {error && (
          <div style={{ padding: "20px", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px",
            color: "#f87171", fontSize: "14px", marginBottom: "24px" }}>
            ⚠️ {error}
          </div>
        )}

        {/* 로그인 안내 */}
        {!user && !isLoading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            로그인 후 나의 판매 포토카드를 확인할 수 있습니다.
          </div>
        )}

        {/* 카드 그리드 */}
        <div className="grid gap-x-[20px] gap-y-[20px]"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
            : pagedCards.map((card) => <SaleCard key={card.id} card={card} />)
          }
        </div>

        {/* 빈 상태 */}
        {!isLoading && !error && user && filteredCards.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            판매 중인 포토카드가 없습니다.
          </div>
        )}

        {/* 페이지네이션 */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent", color: "rgba(255,255,255,0.5)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.3 : 1,
                fontSize: "16px",
              }}
            >‹</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  border: page === currentPage ? "1px solid #EFFF04" : "1px solid rgba(255,255,255,0.15)",
                  background: page === currentPage ? "#EFFF04" : "transparent",
                  color: page === currentPage ? "#000" : "rgba(255,255,255,0.5)",
                  fontWeight: page === currentPage ? "700" : "400",
                  cursor: "pointer", fontSize: "13px",
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent", color: "rgba(255,255,255,0.5)",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.3 : 1,
                fontSize: "16px",
              }}
            >›</button>
          </div>
        )}

      </main>
    </div>
  );
}
