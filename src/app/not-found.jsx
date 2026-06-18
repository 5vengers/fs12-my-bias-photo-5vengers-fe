'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/commons/Button/Button';

const notFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-[60px]">
      <h1 className="font-baskin text-5xl">
        <span className="text-main">페이지</span>를 찾을 수{' '}
        <span className="text-gray-300">없습니다.</span>
      </h1>
      <Button
        type="sec"
        btnType="button"
        size="lg"
        onClick={() => router.back()}
      >
        이전으로 돌아가기
      </Button>
    </div>
  );
};

export default notFound;
