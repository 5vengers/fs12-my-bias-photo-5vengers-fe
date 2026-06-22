import Image from 'next/image';
import Link from 'next/link';

const FooterCTASection = () => {
  return (
    <section className="relative flex min-h-[600px] w-full flex-col items-center justify-center gap-[28px] overflow-hidden bg-black py-20">
      <Image
        src="/images/img-landing-5.webp"
        alt="최애의포토"
        width={150}
        height={150}
        className="h-auto w-38 object-cover"
      />

      <h2 className="text-center text-4xl font-bold text-white">
        나의 최애를 지금 찾아보세요!
      </h2>

      <div className="flex items-center justify-center text-black">
        <Link
          href="/market"
          className="bg-main cursor-pointer rounded-xs px-14 py-[18px] font-bold"
        >
          최애 찾으러 가기
        </Link>
      </div>
    </section>
  );
};

export default FooterCTASection;
