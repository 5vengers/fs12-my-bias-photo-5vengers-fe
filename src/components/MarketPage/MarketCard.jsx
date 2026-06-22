import Card from '@/components/commons/Card/Card';
import { GENRE_OPTIONS } from '@/constants/marketOptions';
import { useRouter } from 'next/navigation';

function MarketCard({ item, onRequireAuth }) {
  const router = useRouter();

  const remaining = item.quantity - item.soldQuantity;
  const isSoldOut = remaining <= 0;

  const handleClick = () => {
    const ok = onRequireAuth?.(item.id);
    if (!ok) return;

    router.push(`/market/${item.id}`);
  };

  return (
    <div onClick={handleClick} className="block cursor-pointer">
      <Card isLogo>
        <Card.Image
          src={item.imageUrl}
          alt={item.title}
          state={isSoldOut ? 'soldOut' : 'sale'}
        />
        <Card.Title className="mt-5 mb-[0px]">{item.title}</Card.Title>
        <Card.InfoLayout>
          <Card.Info nickname={item.sellerNickname}>
            <Card.Grade>{item.grade}</Card.Grade>
            <span className="text-gray-300">
              {GENRE_OPTIONS.find((g) => g.value === item.genre)?.label ??
                item.genre}
            </span>
          </Card.Info>
        </Card.InfoLayout>
        <Card.SaleInfoLayout>
          <Card.SaleInfo
            title={'가격'}
            type={'point'}
            count={item.pricePerCard.toLocaleString()}
          />
          <Card.SaleInfo
            title="잔여"
            type="quantity"
            count={[Math.max(0, remaining), item.quantity]}
          />
        </Card.SaleInfoLayout>
      </Card>
    </div>
  );
}

export default MarketCard;
