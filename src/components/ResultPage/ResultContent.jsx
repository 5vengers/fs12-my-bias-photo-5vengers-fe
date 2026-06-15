import Button from '../commons/Button/Button';
import Link from 'next/link';

import { LINK_NAME } from './result.config.js';

/**
 * title = 해당 행동의 제목 (포토카드 생성 등)
 * info = 해당 하는 result 값에 info가 있을 경우 사용(예: [RARE | 포토카드 이름])
 * link = 이동할 link
 * btnTxt = 이동할 곳의 이름 (마이갤러리 확인하기 등)
 * isSuccess = 성공 or 실패 (boolean)
 */
const ResultContent = ({ title, info = '', link, isSuccess, btnTxt }) => {
  const hasFinalConstant = (char) => {};

  const handleBtnTxt = () => {
    const linkName = link.slice(1);
    const lastChar = link.slice(-1);
    const charFix = hasFinalConstant(lastChar) ? '으로' : '로';

    if (!Object.keys(LINK_NAME).includes(linkName)) {
      return '';
    }

    return `${LINK_NAME[linkName]}${isSuccess ? ' 확인하기' : `${charFix} 돌아가기`}`;
  };

  return (
    <div className="flex w-[1000px] flex-col items-center justify-center gap-[60px]">
      <div className="flex flex-col gap-[40px]">
        <h1 className="font-baskin">
          <span>{title}</span>{' '}
          <span className={isSuccess ? 'text-main' : 'text-gray-300'}>
            {isSuccess ? '성공' : '실패'}
          </span>
        </h1>

        <p className="font-bold">
          {/* info가 있을 수도 있고 없을 수도 있음 */}
          {`${info} `}
          {title}
          {isSuccess ? '에 성공했습니다!' : '에 실패했습니다.'}
        </p>
      </div>

      <Link href={link}>
        <Button type="sec">{handleBtnTxt()}</Button>
      </Link>
    </div>
  );
};

export default ResultContent;
