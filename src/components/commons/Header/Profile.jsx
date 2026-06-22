import Link from 'next/link';

const Profile = ({ ref, username, point, setIsOpen, children }) => {
  return (
    <div
      ref={ref}
      className="font-noto mobile:h-screen mobile:flex mobile:flex-col mobile:top-0 mobile:left-0 mobile:shadow-xl absolute right-0 z-50 w-65 bg-gray-500"
    >
      <div className="flex flex-col items-start gap-5 border-b border-gray-300 p-5">
        <p className="text-lg font-bold">안녕하세요, {username}님!</p>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-gray-300">보유 포인트</span>
          <span className="text-main text-xs">{point}</span>
        </div>
      </div>
      <nav className="flex flex-col items-start gap-4 p-5">
        <Link
          onClick={() => setIsOpen(false)}
          className="text-sm font-bold"
          href={'/market'}
        >
          마켓플레이스
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          className="text-sm font-bold"
          href={'/myGallery'}
        >
          마이갤러리
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          className="text-sm font-bold"
          href={'/mySales'}
        >
          판매 중인 포토카드
        </Link>
      </nav>
      <div className="mobile:flex hidden flex-1 flex-col items-start justify-between gap-4 border-t border-gray-300 p-5">
        {children ? children : ''}
      </div>
    </div>
  );
};

export default Profile;
