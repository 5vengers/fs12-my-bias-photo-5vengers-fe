"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { getMyCards } from "@/libs/myCardApi";

/* ─── 로컬 이미지 폴백 (DB 이미지 연결 전 임시) ─── */
const LOCAL_IMAGES = [
  "/images/img-image1.png",
  "/images/img-image2.png",
  "/images/img-image3.png",
];

function getCardImage(card) {
  if (card.photoCard?.imageUrl) return card.photoCard.imageUrl;
  const index = Math.abs((card.photoCardId || 1) - 1) % LOCAL_IMAGES.length;
  return LOCAL_IMAGES[index];
}

/* ─── NEW 뱃지 기준: 7일 이내 취득 ─── */
function isNewCard(acquiredAt) {
  if (!acquiredAt) return false;
  return Date.now() - new Date(acquiredAt).getTime() < 7 * 24 * 60 * 60 * 1000;
}

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

const FILTER_OPTIONS = {
  등급: ["전체", ...Object.keys(GRADE_LABEL)],
  장르: ["전체", ...Object.keys(GENRE_LABEL)],
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
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3.5 py-[7px] bg-transparent border border-white/20 rounded text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-150 ${
          isFiltered ? "text-main font-semibold" : "text-white/70 font-normal"
        }`}
      >
        {label}
        {isFiltered && <span className="text-[11px]">({displayValue})</span>}
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={`opacity-50 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 min-w-[140px] bg-[#1A1A1A] border border-white/15 rounded-md overflow-hidden z-50 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`block w-full text-left px-4 py-[9px] text-[13px] cursor-pointer border-none transition-colors duration-100 hover:bg-white/[0.06] ${
                value === opt
                  ? "bg-main/8 text-main font-semibold"
                  : "bg-transparent text-white/70 font-normal"
              }`}
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
    <div className="bg-[#111] rounded-lg overflow-hidden border border-white/[0.07]">
      <div className="w-full h-[170px] bg-white/5 animate-pulse" />
      <div className="px-3.5 py-3">
        <div className="h-4 bg-white/5 rounded mb-2 w-[65%]" />
        <div className="h-3 bg-white/5 rounded w-[45%]" />
      </div>
    </div>
  );
}

/* ─── 카드 컴포넌트 ─── */
function MyCard({ card }) {
  const grade      = card.photoCard?.grade;
  const genre      = card.photoCard?.genre;
  const cardName   = card.photoCard?.name ?? `카드 #${card.id}`;
  const imageUrl   = getCardImage(card);
  const gradeStyle = GRADE_STYLE[grade] ?? { text: "#fff", border: "#fff" };
  const isNew      = isNewCard(card.acquiredAt);

  return (
    <div className="border border-white/10 hover:border-white/25 transition-all flex flex-col bg-[#111] rounded-lg overflow-hidden cursor-pointer">
      {/* 이미지 — 동적 URL이므로 inline style 유지 */}
      <div
        className="w-full h-[170px] relative flex-shrink-0"
        style={{ background: `url(${imageUrl}) lightgray 50% / cover no-repeat` }}
      >
        {isNew && (
          <div className="absolute top-2 left-2 bg-main text-black text-[10px] font-extrabold px-[7px] py-0.5 rounded-sm tracking-[0.05em]">
            NEW
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/65 text-white text-[10px] font-bold px-[7px] py-0.5 rounded-sm backdrop-blur-sm">
          ×{card.quantity}
        </div>
      </div>

      {/* 카드 정보 */}
      <div className="px-3.5 py-3">
        <h3 className="text-white font-bold truncate text-[14px] mb-1.5">
          {cardName}
        </h3>

        <div className="flex items-center gap-[5px] mb-2.5">
          {/* 등급 색상은 런타임 동적값이므로 inline style 유지 */}
          <span className="font-bold text-[11px]" style={{ color: gradeStyle.text }}>
            {GRADE_LABEL[grade] ?? grade}
          </span>
          <span className="text-white/20 text-[11px]">|</span>
          <span className="text-white/45 text-[11px]">
            {GENRE_LABEL[genre] ?? genre}
          </span>
        </div>

        <div className="h-px bg-white/[0.07] mb-2" />

        <div className="flex justify-between">
          <span className="text-white/35 text-[11px]">보유 수량</span>
          <span className="text-white text-[11px] font-semibold">{card.quantity}장</span>
        </div>
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ─── */
export default function MyCardsPage() {
  const { user } = useAuthStore();

  const [cards, setCards]         = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  const [currentPage, setCurrentPage]     = useState(1);
  const PAGE_SIZE = 9;

  const [searchQuery, setSearchQuery]     = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [filterGrade, setFilterGrade]     = useState("전체");
  const [filterGenre, setFilterGenre]     = useState("전체");

  useEffect(() => {
    if (!user?.id) { setIsLoading(false); return; }
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMyCards();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user?.id]);

  const gradeCounts = useMemo(() =>
    cards.reduce((acc, c) => {
      const g = c.photoCard?.grade;
      if (g) acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {}),
  [cards]);

  const totalQuantity = useMemo(() =>
    cards.reduce((sum, c) => sum + (c.quantity || 0), 0),
  [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const grade = card.photoCard?.grade;
      const genre = card.photoCard?.genre;
      const name  = card.photoCard?.name ?? "";
      if (selectedGrade && grade !== selectedGrade) return false;
      if (filterGrade !== "전체" && grade !== filterGrade) return false;
      if (filterGenre !== "전체" && genre !== filterGenre) return false;
      if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [cards, selectedGrade, filterGrade, filterGenre, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / PAGE_SIZE));
  const pagedCards = filteredCards.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => { setCurrentPage(1); }, [filterGrade, filterGenre, selectedGrade, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-black">
      <main className="max-w-[1920px] mx-auto px-[220px] py-10">

        <h1 className="text-white text-[28px] font-bold mb-8">
          나의 포토카드
        </h1>

        {/* 통계 박스 */}
        <div className="w-[650px] min-h-[95px] border border-white/15 rounded py-[14px] px-5 flex flex-col justify-between gap-2.5">
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
                  className="grade-button"
                  style={{
                    border: `1px solid ${style.border}`,
                    color: style.text,
                    background: isActive ? `${style.border}25` : "transparent",
                  }}
                >
                  {GRADE_LABEL[grade]}&nbsp;{count}장
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-10" />

        {/* 검색 + 필터 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-[260px]">
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 rounded-md py-2 pl-3.5 pr-10 text-[13px] text-white outline-none"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40"
              width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <DropdownFilter label="등급" options={FILTER_OPTIONS["등급"]}
            value={filterGrade} onChange={setFilterGrade} displayMap={GRADE_LABEL} />
          <DropdownFilter label="장르" options={FILTER_OPTIONS["장르"]}
            value={filterGenre} onChange={setFilterGenre} displayMap={GENRE_LABEL} />
        </div>

        {error && (
          <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-lg text-[#f87171] text-sm mb-6">
            ⚠️ {error}
          </div>
        )}

        {!user && !isLoading && (
          <div className="text-center py-20 text-white/40 text-[15px]">
            로그인 후 나의 포토카드를 확인할 수 있습니다.
          </div>
        )}

        <div className="grid grid-cols-3 gap-x-5 gap-y-5">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
            : pagedCards.map((card) => <MyCard key={card.id} card={card} />)
          }
        </div>

        {!isLoading && !error && user && filteredCards.length === 0 && (
          <div className="text-center py-20 text-white/40 text-[15px]">
            보유한 포토카드가 없습니다.
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full border border-white/20 bg-transparent text-white/50 text-base transition-opacity ${
                currentPage === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              }`}
            >‹</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full border text-[13px] cursor-pointer ${
                  page === currentPage
                    ? "border-main bg-main text-black font-bold"
                    : "border-white/15 bg-transparent text-white/50 font-normal"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full border border-white/20 bg-transparent text-white/50 text-base transition-opacity ${
                currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              }`}
            >›</button>
          </div>
        )}

      </main>
    </div>
  );
}
