"use client";

import { useState, useMemo, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { getMyMarketItems } from "@/libs/marketApi";
import Search from "@/components/commons/Input/Search";
import Select from "@/components/commons/Select/Select";
import Pagination from "@/components/commons/Pagination/Pagination";
import Badge from "@/components/commons/Badge/Badge";
import Card from "@/components/commons/Card/Card";

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

/* ─── 판매방법 ─── */
const SALE_TYPE_LABEL = {
  INSTANT: "즉시구매",
  AUCTION: "경매",
};

/* ─── NEW 뱃지 기준: 7일 이내 등록 ─── */
function isNewCard(createdAt) {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
}

/* ─── 가격 포맷 ─── */
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
function SaleCard({ card }) {
  const isSoldOut = card.status === "SOLD_OUT";
  const isNew     = isNewCard(card.createdAt);
  const remaining = Math.max(0, (card.quantity ?? 0) - (card.soldQuantity ?? 0));
  const cardName  = card.myCard?.photoCard?.name ?? `카드 #${card.id}`;
  const imageUrl  = card.myCard?.photoCard?.imageUrl ?? null;
  const saleType  = card.saleType ?? "INSTANT";

  return (
    <div className="border border-white/10 hover:border-white/25 transition-all flex flex-col bg-[#111] rounded-lg overflow-hidden cursor-pointer">
      {/* 이미지 영역 — 동적 URL이므로 inline style 유지 */}
      <div
        className="w-full h-[170px] relative flex-shrink-0"
        style={{
          background: imageUrl
            ? `url(${imageUrl}) lightgray 50% / cover no-repeat`
            : "rgba(255,255,255,0.05)",
        }}
      >
        {isNew && !isSoldOut && (
          <div className="absolute top-2 left-2 bg-main text-black text-[10px] font-extrabold px-[7px] py-0.5 rounded-sm tracking-[0.05em]">
            NEW
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-[72px] h-[72px] rounded-full border-[3px] border-red-500 bg-red-500/15 flex items-center justify-center -rotate-[20deg]">
              <span className="text-red-500 font-black text-[12px] leading-tight text-center">
                SOLD<br />OUT
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 카드 정보 */}
      <div className="px-3.5 py-3">
        <h3 className="text-white font-bold truncate text-[14px] mb-1.5">
          {cardName}
        </h3>

        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-[5px]">
            <Card.Grade>{card.grade}</Card.Grade>
            <span className="text-white/20 text-[11px]">|</span>
            <span className="text-white/45 text-[11px]">
              {GENRE_LABEL[card.genre] ?? card.genre}
            </span>
          </div>
          {!isSoldOut && (
            /* 판매유형 색상은 런타임 동적값이므로 inline style 유지 */
            <span
              className="text-[10px] font-semibold"
              style={{ color: saleType === "AUCTION" ? "#9B7FE8" : "#00D1FF" }}
            >
              {SALE_TYPE_LABEL[saleType] ?? "즉시구매"}
            </span>
          )}
        </div>

        <div className="h-px bg-white/[0.07] mb-2" />

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-white/35 text-[11px]">가격</span>
            <span className="text-white text-[11px] font-semibold">{formatPrice(card.pricePerCard)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/35 text-[11px]">잔여</span>
            <span className="text-white text-[11px] font-semibold">{remaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ─── */
export default function MySalesPage() {
  const { user } = useAuthStore();

  const [cards, setCards]         = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  const [currentPage, setCurrentPage]       = useState(1);
  const PAGE_SIZE = 9;

  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedGrade, setSelectedGrade]   = useState(null);
  const [filterGrade, setFilterGrade]       = useState("전체");
  const [filterGenre, setFilterGenre]       = useState("전체");
  const [filterSaleType, setFilterSaleType] = useState("전체");
  const [filterSoldOut, setFilterSoldOut]   = useState("전체");

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

  const gradeCounts = useMemo(() =>
    cards.reduce((acc, c) => {
      acc[c.grade] = (acc[c.grade] || 0) + (c.quantity ?? 1);
      return acc;
    }, {}),
  [cards]);

  const totalQuantity = useMemo(() =>
    cards.reduce((sum, c) => sum + (c.quantity ?? 1), 0),
  [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (selectedGrade && card.grade !== selectedGrade) return false;
      if (filterGrade !== "전체" && card.grade !== filterGrade) return false;
      if (filterGenre !== "전체" && card.genre !== filterGenre) return false;
      if (filterSaleType !== "전체") {
        if ((card.saleType ?? "INSTANT") !== filterSaleType) return false;
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

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / PAGE_SIZE));
  const pagedCards = filteredCards.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => { setCurrentPage(1); },
    [filterGrade, filterGenre, filterSaleType, filterSoldOut, selectedGrade, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-black">
      <main className="max-w-[1920px] mx-auto px-[220px] py-10">

        <h1 className="text-white text-[28px] font-bold mb-8">
          나의 판매 포토카드
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

          <Select
            size="noLine"
            desc="판매방법"
            value={filterSaleType !== "전체" ? (SALE_TYPE_LABEL[filterSaleType] ?? filterSaleType) : ""}
          >
            {FILTER_OPTIONS["판매방법"].map((opt) => (
              <Select.Option key={opt} value={opt} onChange={setFilterSaleType}>
                {SALE_TYPE_LABEL[opt] ?? opt}
              </Select.Option>
            ))}
          </Select>

          <Select
            size="noLine"
            desc="매진여부"
            value={filterSoldOut !== "전체" ? filterSoldOut : ""}
          >
            {FILTER_OPTIONS["매진여부"].map((opt) => (
              <Select.Option key={opt} value={opt} onChange={setFilterSoldOut}>
                {opt}
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
            로그인 후 나의 판매 포토카드를 확인할 수 있습니다.
          </div>
        )}

        <div className="grid grid-cols-3 gap-x-5 gap-y-5">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
            : pagedCards.map((card) => <SaleCard key={card.id} card={card} />)
          }
        </div>

        {!isLoading && !error && user && filteredCards.length === 0 && (
          <div className="text-center py-20 text-white/40 text-[15px]">
            판매 중인 포토카드가 없습니다.
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
