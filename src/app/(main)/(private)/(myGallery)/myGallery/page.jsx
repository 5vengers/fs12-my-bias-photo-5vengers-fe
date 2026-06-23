'use client';

import Title from '@/components/commons/Title/Title';
import Button from '@/components/commons/Button/Button';
import Select from '@/components/commons/Select/Select';
import Pagination from '@/components/commons/Pagination/Pagination';
import Badge from '@/components/commons/Badge/Badge';
import Card from '@/components/commons/Card/Card';
import Search from '@/components/commons/Input/Search';
import Image from 'next/image';

import FilterIcon from '@/assets/icons/ic-filter.svg';
import { GENRE_OPTIONS } from '@/constants/marketOptions';
import { Genre, CardGrade } from '@/constants/enums';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import myGalleryService from '@/libs/service/myGalleryService';
import { notFound, useRouter } from 'next/navigation';
import { curDate, remainCount, replaceImage } from '@/libs/myGalleryUtils';
import useCreationLog from '@/hooks/useCreationLog';

const MyGallery = () => {
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useQuery({
    queryKey: ['myCards', keyword, grade, genre, page],
    queryFn: () =>
      myGalleryService.getMyGallery({ keyword, grade, genre, page }),
  });

  const {
    data: cardCount,
    isPending: isCountPending,
    error: isCountError,
  } = useQuery({
    queryKey: ['myCards', 'allCount', 'cardCount'],
    queryFn: myGalleryService.getMyGalleryCount,
  });

  const {
    data: log,
    isPending: isLogPending,
    error: isLogError,
  } = useCreationLog();

  if (error || isCountError || isLogError) return notFound();

  const remain = log?.count !== null ? remainCount(log?.count) : '-';
  const yearMonth = curDate();

  useEffect(() => {
    setPage(1);
  }, [keyword, grade, genre]);

  return (
    <div className="mobile:py-5 relative mx-auto my-0 flex w-full max-w-370 flex-1 flex-col px-5 py-15">
      <Title text="마이갤러리">
        <div className="mobile:fixed mobile:left-2.5 mobile:w-[calc(100% - 20px)] mobile:bottom-10 flex items-end justify-center gap-2.5">
          <span className="mobile:hidden text-gray-300">
            {yearMonth.year}년 {yearMonth.month}월
          </span>
          <Button
            size="lg"
            isThick={false}
            onClick={() => router.push('/cardCreate')}
            disabled={remain === 0 || isLogPending || isLogError}
          >
            포토카드 생성하기 ({isLogPending ? '-' : remain}/3)
          </Button>
        </div>
      </Title>

      <div className="flex flex-col items-start gap-5 border-b border-gray-400 py-10">
        <div className="flex items-center gap-2.5">
          <p className="mobile:text-sm tablet:text-xl text-2xl font-bold">
            {user?.nickname}님이 보유한 포토카드
          </p>
          <p className="text-lg text-gray-300">
            ({isCountPending ? '00' : cardCount?.totalCount}장)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
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
      <div className="mobile:justify-between flex items-center justify-start gap-15 py-5">
        <button
          type="button"
          aria-label="모바일 필터링"
          className="mobile:flex hidden h-11.5 w-11.5 items-center justify-center border-1 border-white"
        >
          <Image src={FilterIcon} alt="필터링" width={24} height={24} />
        </button>

        {/* 검색 */}
        <Search size={'md'} onChange={(e) => setKeyword(e.target.value)} />

        <div className="mobile:hidden flex items-center justify-start gap-15">
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
        </div>
      </div>

      {/* 모바일 필터링 */}
      <div className="mobile:flex hidden"></div>

      {/* 카드 */}
      {isPending ? (
        <div className="font-baskin flex w-full flex-1 items-center justify-center text-xl">
          로딩 중 . . .
        </div>
      ) : data?.cards.length === 0 || cardCount?.totalCount === 0 ? (
        <div className="font-baskin flex w-full flex-1 items-center justify-center text-xl">
          {cardCount?.totalCount === 0
            ? '생성된 카드가 존재하지 않습니다.'
            : '검색 결과가 존재하지 않습니다.'}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-3 gap-20">
          {data?.cards.map((c, i) => (
            <Card key={`card-${i}`} isLogo>
              <Card.Image
                src={replaceImage(c.imageUrl)}
                alt={`포토카드 ${c.name}`}
                priority={i === 0}
              />
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
                <Card.SaleInfo title={'수량'} count={c.quantity} />
              </Card.SaleInfoLayout>
            </Card>
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

export default MyGallery;
