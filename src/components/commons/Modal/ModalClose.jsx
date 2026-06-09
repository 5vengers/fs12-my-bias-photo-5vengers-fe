import Image from 'next/image';
import CloseIcon from '@/assets/icons/ic-close.svg';

const ModalClose = ({ onClose }) => {
  return (
    <>
      <button
        className="absolute top-[30px] right-[30px]"
        onClick={() => onClose()}
      >
        <Image src={CloseIcon} width={18} height={18} alt="닫기" />
      </button>
    </>
  );
};

export default ModalClose;
