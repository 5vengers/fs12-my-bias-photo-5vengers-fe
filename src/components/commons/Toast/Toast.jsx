'use client';

import Image from 'next/image';
import AlertIcon from '@/assets/icons/ic-alert.svg';
import CloselIcon from '@/assets/icons/ic-close.svg'

const Toast = ({
  children,
  onClose,
  toastType = 'success',
}) => {
  return (
    <div className="fixed top-5 left-1/2 z-[9999] -translate-x-1/2">
      <div
        className={`flex items-center gap-3 rounded-full px-6 py-4 text-white shadow-lg ${
          toastType === 'success'
            ? 'bg-green-600'
            : 'bg-red-600'
        }`}
      >
        <Image
          src={AlertIcon}
          width={20}
          height={20}
          alt="알림"
        />

        <span>{children}</span>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-lg"
        >
          <Image
          src={CloselIcon}
          width={20}
          height={20}
          alt="닫힘"
        />
        </button>
      </div>
    </div>
  );
};

export default Toast;