'use client';

import Title from '@/components/commons/Title/Title';
import Button from '@/components/commons/Button/Button';
import Select from '@/components/commons/Select/Select';
import Pagination from '@/components/commons/Pagination/Pagination';
import Badge from '@/components/commons/Badge/Badge';
import Card from '@/components/commons/Card/Card';
import Search from '@/components/commons/Input/Search';

import { Genre, CardGrade } from '@/constants/enums';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import myGalleryService from '@/libs/service/myGalleryService';
import { notFound, useRouter } from 'next/navigation';
import { curDate, remainCount } from '@/libs/dateUtils';

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
  } = useQuery({
    queryKey: ['creationLog'],
    queryFn: myGalleryService.getCreationLog,
  });

  if (error || isCountError || isLogError) return notFound();

  const remain = log?.count !== null ? remainCount(log?.count) : '-';
  const yearMonth = curDate();

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <Title text="마이갤러리">
        <div className="justify-items flex items-end gap-[10px]">
          <span className="text-gray-300">
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

      <div className="flex flex-col items-start gap-[20px] border-be border-gray-400 py-[40px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-xl font-bold">
            {user?.nickname}님이 보유한 포토카드
          </p>
          <p className="text-lg text-gray-300">
            ({isCountPending ? '--' : cardCount?.totalCount}장)
          </p>
        </div>
        <div className="flex items-center gap-[20px]">
          {Object.values(CardGrade).map((g) => (
            <Badge
              key={`grade-${g}`}
              grade={g}
              count={cardCount?.gradeCount[g] || '--'}
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
          <Select.Option size={'noLine'} value={''}>
            전체 장르
          </Select.Option>
          {Object.values(Genre).map((g, i) => (
            <Select.Option key={`genre-${g}-${i}`} size={'noLine'} value={g}>
              {g}
            </Select.Option>
          ))}
        </Select>
      </div>

      {isPending ? (
        <div className="font-baskin flex h-[480px] w-full items-center justify-center text-xl">
          로딩 중 . . .
        </div>
      ) : data?.cards.length === 0 ? (
        <div className="font-baskin flex h-[480px] w-full items-center justify-center text-xl">
          검색 결과가 존재하지 않습니다.
        </div>
      ) : (
        <div className="mt-[40px] grid grid-cols-3 gap-[80px]">
          {data?.cards.map((c, i) => (
            <Card key={`card-${i}`} isLogo>
              <Card.Title>{c.name}</Card.Title>
              <Card.Image
                src={c.imageUrl}
                alt={`포토카드 ${c.name}`}
                priority={i === 0}
              />
              <Card.InfoLayout>
                <Card.Info nickname={c.nickname}>
                  <Card.Grade>{c.grade}</Card.Grade>
                  <span className="text-gray-300">{c.genre}</span>
                </Card.Info>
              </Card.InfoLayout>
              <Card.SaleInfoLayout>
                <Card.SaleInfo title={'가격'} type={'point'} count={c.price} />
                <Card.SaleInfo title={'수량'} count={c.quantity} />
              </Card.SaleInfoLayout>
            </Card>
          ))}
        </div>
      )}

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
