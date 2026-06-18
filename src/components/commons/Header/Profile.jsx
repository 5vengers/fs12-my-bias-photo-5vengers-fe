import useMouseOut from '@/hooks/useMouseOut';
import Link from 'next/link';

const Profile = ({ username, point, setIsOpen }) => {
  const { ref } = useMouseOut({ setIsOpen });
  return (
    <div
      ref={ref}
      className="font-noto absolute right-[0px] z-[999] w-[260px] bg-gray-500"
    >
      <div className="flex flex-col items-start gap-[20px] border-b border-gray-300 p-[20px]">
        <p className="text-lg font-bold">안녕하세요, {username}님!</p>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-gray-300">보유 포인트</span>
          <span className="text-main text-xs">{point}</span>
        </div>
      </div>
      <nav className="flex flex-col items-start gap-[15px] p-[20px]">
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
    </div>
  );
};

export default Profile;
