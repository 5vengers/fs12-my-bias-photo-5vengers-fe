import { notFound } from 'next/navigation';

import CardResult from './CardResult';
import AuthResult from './AuthResult';

import { RESULT_CONFIG, VALID_STATUS_TYPE } from './result.config.js';

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
    link: RESULT_CONFIG[domain][type].link,
    status,
  };

  return (
    <>
      {domain === 'card' && <CardResult config={config} />}
      {domain === 'auth' && <AuthResult config={config} />}
    </>
  );
};

export default ResultPage;
