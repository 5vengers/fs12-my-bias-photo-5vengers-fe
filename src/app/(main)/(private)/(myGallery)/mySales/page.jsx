'use client';

import Title from '@/components/commons/Title/Title';
import Select from '@/components/commons/Select/Select';
import Pagination from '@/components/commons/Pagination/Pagination';
import Badge from '@/components/commons/Badge/Badge';
import Card from '@/components/commons/Card/Card';
import Search from '@/components/commons/Input/Search';

import { GENRE_OPTIONS } from '@/constants/marketOptions';
import { CardGrade } from '@/constants/enums';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import myGalleryService from '@/libs/service/myGalleryService';
import { notFound, useRouter } from 'next/navigation';
import { replaceImage } from '@/libs/myGalleryUtils';
import Chip from '@/components/commons/Chip/Chip';

const SALE_TYPE = {
  SELLING: '판매',
  EXCHANGE: '교환',
};

const SOLD_TYPE = {
  SELLING: '재고 있음',
  SOLD_OUT: '재고 없음',
};

const MySales = () => {
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [saleType, setSaleType] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useQuery({
    queryKey: ['myCards', keyword, grade, genre, saleType, status, page],
    queryFn: () =>
      myGalleryService.getMySales({
        keyword,
        grade,
        genre,
        saleType,
        status,
        page,
      }),
  });

  const {
    data: cardCount,
    isPending: isCountPending,
    error: isCountError,
  } = useQuery({
    queryKey: ['myCards', 'totalCount', 'cardCount'],
    queryFn: myGalleryService.getMySalesCount,
  });

  useEffect(() => {
    setPage(1);
  }, [keyword, grade, genre, saleType, status]);

  if (error || isCountError) return notFound();

  const handleMoveToMarket = (itemId) => {
    router.push(`/market/${itemId}`);
  };

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <Title text="나의 판매 포토카드" />

      <div className="flex flex-col items-start gap-[20px] border-be border-gray-400 py-[40px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-xl font-bold">
            {user?.nickname}님이 거래 중인 포토카드
          </p>
          <p className="text-lg text-gray-300">
            ({isCountPending ? '00' : cardCount?.totalCount}장)
          </p>
        </div>
        <div className="flex items-center gap-[20px]">
          {Object.values(CardGrade).map((g) => (
            <Badge
              key={`grade-${g}`}
              grade={g}
              count={cardCount?.gradeCount[g] || '0'}
            />
          ))}
        </div>
      </div>

      {/* 필터링 */}
      <div className="flex items-center justify-start gap-[60px] py-[20px]">
        {/* 검색 */}
        <Search size={'md'} onChange={(e) => setKeyword(e.target.value)} />

        {/* 등급 */}
        <Select size="noLine" desc={'등급'} onChange={setGrade}>
          <Select.Option size={'noLine'} value={''}>
            전체 등급
          </Select.Option>
          {Object.values(CardGrade).map((g, i) => (
            <Select.Option key={`grade-${g}-${i}`} size={'noLine'} value={g}>
              {g}
            </Select.Option>
          ))}
        </Select>

        {/* 장르 */}
        <Select size="noLine" desc={'장르'} onChange={setGenre}>
          {GENRE_OPTIONS.map((g, i) => (
            <Select.Option
              key={`genre-${g.value}-${i}`}
              size={'noLine'}
              value={g.value}
            >
              {g.label}
            </Select.Option>
          ))}
        </Select>

        {/* 판매방법 */}
        <Select size="noLine" desc={'판매방법'} onChange={setSaleType}>
          <Select.Option size={'noLine'} value={''}>
            판매 방법
          </Select.Option>
          {Object.entries(SALE_TYPE).map(([key, value], i) => (
            <Select.Option
              key={`sale-type-${key}-${i}`}
              size={'noLine'}
              value={key}
            >
              {value}
            </Select.Option>
          ))}
        </Select>

        {/* 매진여부 */}
        <Select size="noLine" desc={'매진여부'} onChange={setStatus}>
          <Select.Option size={'noLine'} value={''}>
            매진 여부
          </Select.Option>
          {Object.entries(SOLD_TYPE).map(([key, value], i) => (
            <Select.Option key={`sold-${key}-${i}`} size={'noLine'} value={key}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* 카드 */}
      {isPending ? (
        <div className="font-baskin flex h-[480px] w-full items-center justify-center text-xl">
          로딩 중 . . .
        </div>
      ) : data?.cards.length === 0 || cardCount?.totalCount === 0 ? (
        <div className="font-baskin flex h-[480px] w-full items-center justify-center text-xl">
          {cardCount?.totalCount === 0
            ? '생성된 카드가 존재하지 않습니다.'
            : '검색 결과가 존재하지 않습니다.'}
        </div>
      ) : (
        <div className="mt-[40px] grid grid-cols-3 gap-[80px]">
          {data?.cards.map((c, i) => (
            <button
              key={`card-${i}`}
              type="button"
              className="text-left"
              onClick={() => handleMoveToMarket(c.id)}
              disabled={c.saleType === 'EXCHANGE'}
            >
              <Card isLogo>
                <div className="relative">
                  {c.remainingQuantity === 0 ? '' : <Chip type={c.saleType} />}
                  <Card.Image
                    state={c.remainingQuantity === 0 ? 'soldOut' : 'sale'}
                    src={replaceImage(c.imageUrl)}
                    alt={`포토카드 ${c.name}`}
                    priority={i === 0}
                  />
                </div>
                <Card.InfoLayout>
                  <Card.Title>{c.name}</Card.Title>
                  <Card.Info nickname={c.nickname}>
                    <Card.Grade>{c.grade}</Card.Grade>
                    <span className="text-gray-300">
                      {' '}
                      {GENRE_OPTIONS.find((g) => g.value === c.genre)?.label ??
                        c.genre}
                    </span>
                  </Card.Info>
                </Card.InfoLayout>
                <Card.SaleInfoLayout>
                  <Card.SaleInfo
                    title={'가격'}
                    type={'point'}
                    count={Number(c.price).toLocaleString('ko-KR')}
                  />
                  <Card.SaleInfo title={'잔여'} count={c.remainingQuantity} />
                </Card.SaleInfoLayout>
              </Card>
            </button>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {isPending ? (
        ''
      ) : (
        <div className="mt-[120px]">
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default MySales;
