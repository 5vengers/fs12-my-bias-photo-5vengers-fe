import Image from 'next/image';
import SoldOut from '@/assets/images/img-soldout.png';

const CardImage = ({ src, alt, state = 'sale', ...props }) => {
  const fallbackSrc = '/placeholder.jpg';
  const safeSrc = src?.trim() ? src : fallbackSrc;

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
        src={safeSrc}
        alt={alt || '카드 이미지'}
        sizes="360px"
        fill
        {...props}
      />
    </div>
  );
};

export default CardImage;
