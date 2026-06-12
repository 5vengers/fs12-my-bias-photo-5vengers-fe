"use client";

import { useState, useMemo, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { getMyCards } from "@/libs/myCardApi";
import Search from "@/components/commons/Input/Search";
import Select from "@/components/commons/Select/Select";
import Pagination from "@/components/commons/Pagination/Pagination";
import Badge from "@/components/commons/Badge/Badge";
import Card from "@/components/commons/Card/Card";
import styles from "./myCards.module.css";

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

const GRADE_CLASS = {
  COMMON:     styles.common,
  RARE:       styles.rare,
  SUPER_RARE: styles.superRare,
  LEGENDARY:  styles.legendary,
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
    <div className="flex min-h-[600px] max-w-[440px] flex-col items-center rounded-xs border-[2px] border-white/10 bg-gray-500 p-[40px] animate-pulse">
      <div className="h-6 bg-white/5 rounded w-[70%] mb-4" />
      <div className="h-[270px] w-[360px] bg-white/5 mb-4" />
      <div className="h-4 bg-white/5 rounded w-full mb-2" />
      <div className="h-4 bg-white/5 rounded w-full" />
    </div>
  );
}

/* ─── 카드 컴포넌트 ─── */
function MyCard({ card, nickname }) {
  const grade    = card.photoCard?.grade;
  const genre    = card.photoCard?.genre;
  const cardName = card.photoCard?.name ?? `카드 #${card.id}`;
  const imageUrl = getCardImage(card);
  const isNew    = isNewCard(card.acquiredAt);

  return (
    <Card>
      <Card.Title>{cardName}</Card.Title>
      <Card.Image src={imageUrl} alt={cardName} />
      <Card.InfoLayout>
        <Card.Info nickname={nickname}>
          <span className={`font-bold text-[11px] ${GRADE_CLASS[grade] ?? ""}`}>
            {GRADE_LABEL[grade] ?? grade}
          </span>
          <span className="text-gray-300">{GENRE_LABEL[genre] ?? genre}</span>
        </Card.Info>
      </Card.InfoLayout>
      <Card.SaleInfoLayout>
        {isNew && (
          <div className="flex w-full">
            <span className="bg-main text-black text-[10px] font-extrabold px-[7px] py-0.5 rounded-sm tracking-[0.05em]">
              NEW
            </span>
          </div>
        )}
        <Card.SaleInfo title="보유 수량" count={card.quantity} />
      </Card.SaleInfoLayout>
    </Card>
  );
}

/* ─── 메인 페이지 ─── */
export default function MyCardsPage() {
  const user = useAuthStore((state) => state.user);

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

        <div className="mt-[40px] grid grid-cols-3 gap-[80px]">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
            : pagedCards.map((card) => (
                <MyCard key={card.id} card={card} nickname={user?.nickname ?? "회원"} />
              ))
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
