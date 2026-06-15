import { notFound } from 'next/navigation';

import CardResult from './CardResult';
import AuthResult from './AuthResult';

import { RESULT_CONFIG, VALID_STATUS_TYPE } from './result.config.js';

/**
 * search params 를 통해 들어온 정보로 page 를 판단합니다.
 *
 * type, status, domain 은 result.config.js 에 정보가 있습니다.
 *
 * 예: ?type=sell&status=success&domain=card -> 카드 판매를 성공했을 때의 결과 페이지
 *  */
const ResultPage = async ({ searchParams }) => {
  const { type, status, domain } = await searchParams;

  // params 로 넘어온 type, status 값이 일치하지 않다면 404
  if (
    !Object.keys(RESULT_CONFIG).includes(domain) ||
    !Object.keys(RESULT_CONFIG[domain]).includes(type) ||
    !VALID_STATUS_TYPE.includes(status)
  ) {
    notFound();
  }

  const config = {
    title: RESULT_CONFIG[domain][type].title,
    link: RESULT_CONFIG[domain][type][status].link,
    isSuccess: status === 'success',
  };

  return (
    <>
      {domain === 'card' && <CardResult config={config} />}
      {domain === 'auth' && <AuthResult config={config} />}
    </>
  );
};

export default ResultPage;
