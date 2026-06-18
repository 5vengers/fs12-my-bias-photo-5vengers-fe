import Link from 'next/link';
import Card from '@/components/commons/Card/Card';
import { GENRE_OPTIONS } from '@/constants/marketOptions';

function MarketCard({ item }) {
  const remaining = item.quantity - item.soldQuantity;

  return (
    <Link href={`/market/${item.id}`} className="block">
      <Card isLogo>
        <Card.Image src={item.imageUrl} alt={item.title} />
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
            count={item.pricePerCard}
          />
          <Card.SaleInfo
            title="잔여"
            type="quantity"
            count={[remaining, item.quantity]}
          />
        </Card.SaleInfoLayout>
      </Card>
    </Link>
  );
}

export default MarketCard;
