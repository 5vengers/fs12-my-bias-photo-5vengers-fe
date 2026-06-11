"use client";

import { useState, useMemo, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { getMyCards } from "@/libs/myCardApi";
import Search from "@/components/commons/Input/Search";
import Select from "@/components/commons/Select/Select";
import Pagination from "@/components/commons/Pagination/Pagination";
import Badge from "@/components/commons/Badge/Badge";
import Card from "@/components/commons/Card/Card";

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
  const grade    = card.photoCard?.grade;
  const genre    = card.photoCard?.genre;
  const cardName = card.photoCard?.name ?? `카드 #${card.id}`;
  const imageUrl = getCardImage(card);
  const isNew    = isNewCard(card.acquiredAt);

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
          <Card.Grade>{grade}</Card.Grade>
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
            {Object.keys(GRADE_LABEL).map((grade) => {
              const count    = gradeCounts[grade] || 0;
              const isActive = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(isActive ? null : grade)}
                  className={`transition-opacity ${isActive ? "" : "opacity-50 hover:opacity-80"}`}
                >
                  <Badge grade={grade} count={count} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-10" />

        {/* 검색 + 필터 */}
        <div className="flex items-center gap-4 mb-8">
          <Search size="sm" onChange={(e) => setSearchQuery(e.target.value)} />

          <Select
            size="noLine"
            desc="등급"
            value={filterGrade !== "전체" ? (GRADE_LABEL[filterGrade] ?? filterGrade) : ""}
          >
            {FILTER_OPTIONS["등급"].map((opt) => (
              <Select.Option key={opt} value={opt} onChange={setFilterGrade}>
                {GRADE_LABEL[opt] ?? opt}
              </Select.Option>
            ))}
          </Select>

          <Select
            size="noLine"
            desc="장르"
            value={filterGenre !== "전체" ? (GENRE_LABEL[filterGenre] ?? filterGenre) : ""}
          >
            {FILTER_OPTIONS["장르"].map((opt) => (
              <Select.Option key={opt} value={opt} onChange={setFilterGenre}>
                {GENRE_LABEL[opt] ?? opt}
              </Select.Option>
            ))}
          </Select>
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
          <div className="mt-12 mb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

      </main>
    </div>
  );
}
