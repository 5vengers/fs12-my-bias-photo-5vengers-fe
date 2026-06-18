import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
/*
  children = 합성 컴포넌트 자식 props
  isLogo = logo 가 있는 카드인지 아닌지 (default: false)
*/
const CardMain = ({ children, isLogo = false }) => {
  return (
    <div className="flex min-h-[600px] max-w-[440px] flex-col items-center rounded-xs border-[2px] border-white/10 bg-gray-500 p-[40px]">
      {children}
      {isLogo && (
        <Image
          className="mt-auto pt-[15px]"
          src={Logo}
          width={100}
          height={18}
          alt="최애의 포토 로고"
        />
      )}
    </div>
  );
};

export default CardMain;
