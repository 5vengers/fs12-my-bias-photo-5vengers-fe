import Image from 'next/image';
import Alret from '@/assets/icons/ic-alert.svg';

/*
    toast ui 를 추가합니다.

    toastType = 'success' or 'error'
    toastMsg = toast에 들어갈 메시지 
*/

const Toast = ({ children }) => {
  return (
    <div className="fixed top-[20px] z-[9999] flex flex-col gap-[10px]">
      <div className="mx-auto my-[0] flex w-fit items-center justify-center rounded-[99px] px-[40px] py-[24px] text-white">
        <span>
          <Image src={Alret} width={24} height={24} alt="알람 아이콘" />
        </span>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Toast;
