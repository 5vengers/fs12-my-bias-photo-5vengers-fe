import Image from 'next/image';
import PrevIcon from '@/assets/icons/ic-left.svg';
import NextIcon from '@/assets/icons/ic-right.svg';

/*
    currentPage  : 현재 페이지
    totalPages   : 총 페이지
    onPageChange : 페이지 이동 시 실행될 함수
    disabled     : 비활성화 여부
*/
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 0 || !onPageChange) return null;

  /* ─── 표시할 페이지 번호 계산 (← 1 2 3 4 5 ... 20 →) ─── */
  const buildPages = () => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = totalPages === 1 ? [1] : buildPages();

  const btnBase   = 'flex items-center justify-center text-white transition-colors';
  const pageBtn   = `${btnBase} w-[50px] h-[50px] text-sm hover:border hover:border-white/30`;
  const activeBtn = `${pageBtn} border border-white/60`;
  const arrowBtn  = `${btnBase} w-[50px] h-[50px]`;

  return (
    <nav className="flex items-center justify-center gap-[20px]" aria-label="페이지네이션">
      {/* 이전 */}
      <button
        type="button"
        className={`${arrowBtn} ${currentPage === 1 ? 'opacity-30' : 'hover:opacity-70'}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        <Image src={PrevIcon} alt="이전 페이지" width={24} height={24} />
      </button>

      {/* 페이지 번호 */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="text-white/40 text-sm w-[20px] text-center select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={page === currentPage ? activeBtn : pageBtn}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            disabled={disabled}
          >
            {page}
          </button>
        )
      )}

      {/* 다음 */}
      <button
        type="button"
        className={`${arrowBtn} ${currentPage === totalPages ? 'opacity-30' : 'hover:opacity-70'}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        <Image src={NextIcon} alt="다음 페이지" width={24} height={24} />
      </button>
    </nav>
  );
};

export default Pagination;
