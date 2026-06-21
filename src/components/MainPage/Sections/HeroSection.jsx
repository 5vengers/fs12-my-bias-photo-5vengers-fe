import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <div className="relative z-[2] mb-12 pt-20 text-center">
        <div className="mb-[25px] flex h-auto w-auto items-center justify-center">
          <Image
            src="/images/img-logo.webp"
            alt="최애의 포토 로고"
            width={140}
            height={25}
            priority
            className="h-auto w-32"
          />
        </div>
        <h1 className="mb-[35px] text-6xl font-bold text-white">
          구하기 어려웠던
          <br />
          <span className="text-main">나의 최애</span>가 여기에!
        </h1>
        <div className="flex items-center justify-center text-black">
          <Link
            href="/market"
            className="bg-main cursor-pointer rounded-xs px-14 py-[18px] font-bold"
          >
            최애 찾으러 가기
          </Link>
        </div>
      </div>

      <div className="relative z-[2] flex min-h-[765px] w-full max-w-[1920px] justify-center">
        <Image
          src="/images/img-landing-1.webp"
          alt="마켓플레이스 미리보기"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="min-h-screen-header absolute top-[15px] z-[1] flex w-full max-w-[1800px] overflow-hidden rounded-3xl">
        <Image
          src="/images/img-landing-0.webp"
          alt="랜딩페이지 배경"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default HeroSection;
