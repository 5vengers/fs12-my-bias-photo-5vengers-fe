import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';

const CardMain = ({ children, isLogo = false }) => {
  return (
    <div className="flex min-h-[600px] max-w-[440px] flex-col items-center rounded-xs border-[2px] border-white/10 bg-gray-500 p-[40px]">
      {children}
      {isLogo && (
        <Image
          className="mt-[15px]"
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
