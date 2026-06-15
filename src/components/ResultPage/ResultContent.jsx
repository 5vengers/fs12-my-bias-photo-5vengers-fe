import Button from '../commons/Button/Button';
import Link from 'next/link';

/**
 * title = 해당 행동의 제목 (포토카드 생성 등)
 * message = (예: [RARE | 포토카드 이름] 포토카드 생성)
 * link = 이동할 link
 * btnTxt = 이동할 곳의 이름 (마이갤러리 확인하기 등)
 * isSuccess = 성공 or 실패 (boolean)
 */
const ResultContent = ({ title, info, link, isSuccess, btnTxt }) => {
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
          {`${info} ${title}`}
          {isSuccess ? '에 성공했습니다!' : '에 실패했습니다.'}
        </p>
      </div>

      <Link href={link}>
        <Button type="sec">{btnTxt}</Button>
      </Link>
    </div>
  );
};

export default ResultContent;
