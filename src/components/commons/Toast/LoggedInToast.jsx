'use client';

import { useEffect, useState } from 'react';
import Toast from '@/components/commons/Toast/Toast';
import useAuthStore from '@/store/authStore';

const LoggedInToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('login');

  const showLoggedInToast = useAuthStore((state) => state.showLoggedInToast);
  const loggedInToastVariant = useAuthStore(
    (state) => state.loggedInToastVariant,
  );
  const setShowLoggedInToast = useAuthStore(
    (state) => state.setShowLoggedInToast,
  );

  useEffect(() => {
    if (!showLoggedInToast) return;
    setToastVariant(loggedInToastVariant);
    setShowLoggedInToast(false);
    setShowToast(true);
  }, [showLoggedInToast, loggedInToastVariant]);

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);

  if (!showToast) return null;

  return (
    <Toast toastType="success" onClose={() => setShowToast(false)}>
      {toastVariant === 'register'
        ? '회원가입 및 로그인이 완료되었습니다!'
        : '로그인 되었습니다!'}
    </Toast>
  );
};

export default LoggedInToast;
