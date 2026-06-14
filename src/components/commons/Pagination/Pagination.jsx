import Image from 'next/image';
import PrevIcon from '@/assets/icons/ic-left.svg';
import NextIcon from '@/assets/icons/ic-right.svg';

const DEFAULT_GROUP_SIZE = 5;

/*
    currentPage : 현재 페이지
    totalPages : 총 페이지
    onPageChange : 페이지 이동 시 실행될 함수
    groupSize: 페이지를 보여줄 개수
    disabled : 페이지를 보여줄지 아닐지
*/
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  groupSize = DEFAULT_GROUP_SIZE,
  disabled = false,
}) => {
  if (totalPages <= 0 || !onPageChange) {
    return;
  }

  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const navigationDisabled = disabled || totalPages === 1;

  const movePadding = 'px-[13px] py-[14px]';
  const pagePadding = 'px-[20px] py-[13px]';
  const pageStyle = 'text-white hover:border hover:border-gray-200';
  const activeStyle = 'border border-border-gray-200';

  return (
    <nav
      className="flex items-center justify-center gap-[10px]"
      aria-label="페이지네이션"
    >
      <button
        type="button"
        className={`${movePadding} ${pageStyle} ${currentPage === 1 ? 'grayscale' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={navigationDisabled || currentPage === 1}
      >
        <Image src={PrevIcon} alt="이전 페이지" width={24} height={24} />
      </button>

      {/* 현재 페이지 번호인 버튼에만 active 표시 */}
      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            className={`${pagePadding} ${pageStyle} ${isActive ? activeStyle : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            disabled={disabled}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={`${movePadding} ${pageStyle} ${currentPage === totalPages ? 'grayscale' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={navigationDisabled || currentPage === totalPages}
      >
        <Image src={NextIcon} alt="다음 페이지" width={24} height={24} />
      </button>
    </nav>
  );
};

export default Pagination;
