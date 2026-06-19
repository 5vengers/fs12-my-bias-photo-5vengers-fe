import Image from 'next/image';
import PrevIcon from '@/assets/icons/ic-left.svg';
import NextIcon from '@/assets/icons/ic-right.svg';
import DropDown from './DropDown';
import { useState } from 'react';
import useMouseOut from '@/hooks/useMouseOut';

/*
    currentPage : 현재 페이지
    totalPages : 총 페이지
    onPageChange : 페이지 이동 시 실행될 함수
*/
const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref } = useMouseOut({ setIsOpen: () => setOpenIndex(null) });

  if (totalPages <= 0 || !onPageChange) {
    return;
  }

  const pageStyle = 'w-[50px] h-[50px] flex items-center justify-center';
  const disableStyle = 'brightness-50';
  const hoverStyle = 'text-white hover:inset-shadow-xs cursor-pointer';
  const activeStyle = 'border border-white cursor-pointer';

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const getPages = (curPage, lastPage) => {
    const pages = [];
    // 중복값 방지를 위해 nums set 배열 선언
    const nums = new Set([]);
    const firstPage = 1;
    const prevPage = curPage - 1 < 1 ? 1 : curPage - 1;
    const nextPage = curPage + 1 > lastPage ? lastPage : curPage + 1;
    const gap = 2;

    if (lastPage === firstPage) {
      return [1];
    }

    // 현재 페이지가 1이거나 totalPages 일 때에는 무조건 1,2,3, ... , n-2,n-1,n
    if ((curPage === firstPage || curPage === lastPage) && lastPage !== 2) {
      //1 2 3
      for (let i = firstPage; i <= firstPage + gap; i++) {
        nums.add(i);
      }

      //n-2 n-1 n
      for (let i = lastPage - gap; i <= lastPage; i++) {
        nums.add(i);
      }
    } else {
      const sampleArr = [firstPage, prevPage, curPage, nextPage, lastPage];
      sampleArr.forEach((p) => nums.add(p));
    }

    // arr 변환
    const numsArr = Array.from(nums);

    // 앞 뒤 수가 gap 만큼 차이나면 '...' 추가 아니라면 숫자 추가
    numsArr.forEach((n, i) => {
      if (i > 0 && n - numsArr[i - 1] >= gap) {
        pages.push('...');
      }
      pages.push(n);
    });

    return pages;
  };

  return (
    <nav aria-label="페이지네이션">
      <ul ref={ref} className="flex items-center justify-center gap-[20px]">
        <li>
          <button
            type="button"
            className={`${pageStyle} ${prevDisabled ? disableStyle : hoverStyle}`}
            onClick={() => {
              const prevPage = currentPage - 1;
              onPageChange(prevPage < 1 ? 1 : prevPage);
            }}
            disabled={prevDisabled}
            aria-label="이전 페이지"
          >
            <Image src={PrevIcon} alt="이전 페이지" width={24} height={24} />
          </button>
        </li>

        {getPages(currentPage, totalPages).map((p, i, pages) => {
          const isActive = p === currentPage;
          return (
            <li key={`page-${i}`} aria-current={isActive ? 'page' : undefined}>
              {p === '...' ? (
                <span
                  className={`relative ${pageStyle} ${hoverStyle} ${isActive ? activeStyle : ''}`}
                >
                  <DropDown
                    isOpen={openIndex === i}
                    index={i}
                    handleOpen={setOpenIndex}
                    start={pages[i - 1]}
                    end={pages[i + 1]}
                    onChange={onPageChange}
                  />
                  <span className="absolute right-0 bottom-0 h-0 w-0 border-b-[10px] border-l-[10px] border-b-white border-l-transparent"></span>
                </span>
              ) : (
                <button
                  type="button"
                  className={`${pageStyle} ${hoverStyle} ${isActive ? activeStyle : ''}`}
                  onClick={() => onPageChange(p)}
                  disabled={isActive}
                  aria-label={`${p} 페이지`}
                >
                  {p}
                </button>
              )}
            </li>
          );
        })}

        <li>
          <button
            type="button"
            className={`${pageStyle} ${nextDisabled ? disableStyle : hoverStyle}`}
            onClick={() => {
              const nextPage = currentPage + 1;
              onPageChange(nextPage < totalPages ? nextPage : totalPages);
            }}
            disabled={nextDisabled}
            aria-label="다음 페이지"
          >
            <Image src={NextIcon} alt="다음 페이지" width={24} height={24} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
