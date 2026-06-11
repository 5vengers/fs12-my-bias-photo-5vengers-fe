import Image from 'next/image';
import SearchIcon from '@/assets/icons/ic-search.svg';

const Search = ({ size, ...props }) => {
  const sizeStyle = {
    sm: 'px-[20px] py-[11px] text-sm w-[200px]',
    md: 'px-[20px] py-[13px] text-sm w-[320px]',
    lg: 'px-[20px] py-[11px] w-[345px]',
  };

  return (
    <div
      className={`flex items-center justify-between border border-gray-200 text-white ${sizeStyle[size]}`}
    >
      <input
        className="w-[90%]"
        type="text"
        id="search-input"
        name="search-input"
        placeholder="검색"
        {...props}
      />
      <Image src={SearchIcon} alt="검색 아이콘" width={20} height={20} />
    </div>
  );
};

export default Search;
