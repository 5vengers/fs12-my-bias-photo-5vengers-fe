import Image from 'next/image';
import SoldOut from '@/assets/images/img-soldout.png';

const CardImage = ({ src, alt, state = 'sale' }) => {
  return (
    <div className="relative h-[270px] w-[360px]">
      {state === 'soldOut' && (
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-black/50">
          <Image
            className="object-cover"
            src={SoldOut}
            alt="판매 완료"
            width={230}
            height={230}
          />
        </div>
      )}
      <Image
        className="object-cover"
        src={src}
        alt={alt}
        width={360}
        height={270}
      />
    </div>
  );
};

export default CardImage;
