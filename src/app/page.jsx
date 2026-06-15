'use client';

import Pagination from '@/components/commons/Pagination/Pagination';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState(1);

  const onPageChange = (num) => {
    setPage(num);
  };

  return (
    <div>
      메인 화면
      <Pagination
        currentPage={page}
        totalPages={20}
        onPageChange={onPageChange}
      />
    </div>
  );
}
