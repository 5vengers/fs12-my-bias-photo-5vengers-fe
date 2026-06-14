"use client";

import { useState, useMemo, useEffect } from "react";
import Search from "@/components/commons/Input/Search";
import Select from "@/components/commons/Select/Select";
import Pagination from "@/components/commons/Pagination/Pagination";
import Badge from "@/components/commons/Badge/Badge";
import Card from "@/components/commons/Card/Card";

const MOCK_USER = { id: "mock-1", nickname: "유디" };

const IMG = {
  spain:  "/images/spain.png",
  howfar: "/images/how-far.png",
  garden: "/images/our-garden.png",
};

const MOCK_CARDS = [
  /* ── LEGENDARY × 3 ── */
  { id:  1, grade: "LEGENDARY",  genre: "CONCERT", saleType: "AUCTION",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "우리집 앞마당",  imageUrl: IMG.garden } } },
  { id:  2, grade: "LEGENDARY",  genre: "CONCERT", saleType: "AUCTION",  status: "SOLD_OUT", quantity: 1, soldQuantity: 1, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  { id:  3, grade: "LEGENDARY",  genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  /* ── SUPER RARE × 3 ── */
  { id:  4, grade: "SUPER_RARE", genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "우리집 앞마당",  imageUrl: IMG.garden } } },
  { id:  5, grade: "SUPER_RARE", genre: "FANSIGN", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  { id:  6, grade: "SUPER_RARE", genre: "ALBUM",   saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  /* ── RARE × 5 ── */
  { id:  7, grade: "RARE",       genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  { id:  8, grade: "RARE",       genre: "CONCERT", saleType: "INSTANT",  status: "SOLD_OUT", quantity: 1, soldQuantity: 1, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  { id:  9, grade: "RARE",       genre: "FANSIGN", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "우리집 앞마당",  imageUrl: IMG.garden } } },
  { id: 10, grade: "RARE",       genre: "ALBUM",   saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  { id: 11, grade: "RARE",       genre: "MD",      saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  /* ── COMMON × 10 ── */
  { id: 12, grade: "COMMON",     genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  { id: 13, grade: "COMMON",     genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  { id: 14, grade: "COMMON",     genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "우리집 앞마당",  imageUrl: IMG.garden } } },
  { id: 15, grade: "COMMON",     genre: "BENEFIT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  { id: 16, grade: "COMMON",     genre: "FANSIGN", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  { id: 17, grade: "COMMON",     genre: "ALBUM",   saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "우리집 앞마당",  imageUrl: IMG.garden } } },
  { id: 18, grade: "COMMON",     genre: "CONCERT", saleType: "INSTANT",  status: "SOLD_OUT", quantity: 1, soldQuantity: 1, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
  { id: 19, grade: "COMMON",     genre: "CONCERT", saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "How Far I'll Go", imageUrl: IMG.howfar } } },
  { id: 20, grade: "COMMON",     genre: "MD",      saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "우리집 앞마당",  imageUrl: IMG.garden } } },
  { id: 21, grade: "COMMON",     genre: "COLLAB",  saleType: "INSTANT",  status: "ON_SALE",  quantity: 1, soldQuantity: 0, pricePerCard: 4, myCard: { photoCard: { name: "스페인 여행",     imageUrl: IMG.spain  } } },
];

/* ─── 등급 ─── */
const GRADE_LABEL = {
  COMMON:     "COMMON",
  RARE:       "RARE",
  SUPER_RARE: "SUPER RARE",
  LEGENDARY:  "LEGENDARY",
};

const GRADE_CLASS = {
  COMMON:     "grade-common",
  RARE:       "grade-rare",
  SUPER_RARE: "grade-super-rare",
  LEGENDARY:  "grade-legendary",
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

const FILTER_OPTIONS = {
  등급:    ["전체", ...Object.keys(GRADE_LABEL)],
  장르:    ["전체", ...Object.keys(GENRE_LABEL)],
  판매방법: ["전체", "INSTANT", "AUCTION"],
  매진여부: ["전체", "판매중", "판매완료"],
};

/* ─── 카드 컴포넌트 ─── */
function SaleCard({ card, nickname }) {
  const isSoldOut = card.status === "SOLD_OUT";
  const remaining = Math.max(0, (card.quantity ?? 0) - (card.soldQuantity ?? 0));
  const cardName  = card.myCard?.photoCard?.name ?? `카드 #${card.id}`;
  const imageUrl  = card.myCard?.photoCard?.imageUrl ?? "/images/img-image1.png";
  const saleType  = card.saleType ?? "INSTANT";

  return (
    <Card isLogo>
      <div className="w-full flex justify-between items-center mb-3">
        <Card.Title>{cardName}</Card.Title>
        {!isSoldOut && (
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 border rounded-sm ${saleType === "AUCTION" ? "sale-auction border-purple" : "sale-instant border-blue"}`}>
            {SALE_TYPE_LABEL[saleType]}
          </span>
        )}
      </div>
      <Card.Image
        src={imageUrl}
        alt={cardName}
        state={isSoldOut ? "soldOut" : "sale"}
      />
      <Card.InfoLayout>
        <Card.Info nickname={nickname}>
          <span className={`font-bold text-[11px] ${GRADE_CLASS[card.grade] ?? ""}`}>
            {GRADE_LABEL[card.grade] ?? card.grade}
          </span>
          <span className="text-gray-300 text-[11px]">{GENRE_LABEL[card.genre] ?? card.genre}</span>
        </Card.Info>
      </Card.InfoLayout>
      <Card.SaleInfoLayout>
        <Card.SaleInfo title="가격" type="point" count={card.pricePerCard} />
        <Card.SaleInfo title="잔여" count={remaining} />
      </Card.SaleInfoLayout>
    </Card>
  );
}

/* ─── 메인 페이지 ─── */
export default function MySalesPage() {
  const user  = MOCK_USER;
  const cards = MOCK_CARDS;

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 9;

  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedGrade, setSelectedGrade]   = useState(null);
  const [filterGrade, setFilterGrade]       = useState("전체");
  const [filterGenre, setFilterGenre]       = useState("전체");
  const [filterSaleType, setFilterSaleType] = useState("전체");
  const [filterSoldOut, setFilterSoldOut]   = useState("전체");

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
            {user.nickname}님이 보유한 포토카드&nbsp;
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
                  className={`text-[11px] scale-[0.9] origin-left transition-opacity ${isActive ? "" : "opacity-50 hover:opacity-80"}`}
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

        <div className="grid grid-cols-3 gap-[80px]">
          {pagedCards.map((card) => (
            <SaleCard key={card.id} card={card} nickname={user.nickname} />
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-20 text-white/40 text-[15px]">
            조건에 맞는 포토카드가 없습니다.
          </div>
        )}

        {totalPages > 1 && (
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
