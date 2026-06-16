'use client';

import { useEffect, useState } from 'react';
import Toast from '@/components/commons/Toast/Toast';
import useAuthStore from '@/store/authStore';

const LoggedInToast = () => {
  const [showToast, setShowToast] = useState(false);
  const showLoggedInToast = useAuthStore((state) => state.showLoggedInToast);
  const setShowLoggedInToast = useAuthStore(
    (state) => state.setShowLoggedInToast,
  );

  useEffect(() => {
    if (!showLoggedInToast) return;
    setShowLoggedInToast(false);
    setShowToast(true);
  }, [showLoggedInToast]);

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
      로그인 되었습니다!
    </Toast>
  );
};

export default LoggedInToast;
