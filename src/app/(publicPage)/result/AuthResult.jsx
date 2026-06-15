'use client';

import ResultContent from '@/components/ResultPage/ResultContent';
import useAuthStore from '@/store/authStore';

const AuthResult = ({ config }) => {
  const { title, link, isSuccess } = config;

  const user = useAuthStore((state) => state.user);

  /* 유저 정보를 이용한 info 만들기 */

  return (
    <>
      <ResultContent
        title={title}
        link={link}
        isSuccess={isSuccess}
        btnTxt={handleLinkTxt()}
      />
    </>
  );
};

export default AuthResult;
