import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/commons/Card/Card';
import logoImage from '@/assets/images/img-logo.svg';

function MarketCard({ item }) {
  return (
    <Link href={`/market/${item.id}`} className="block">
      <Card isLogo>
        <Card.Image src={item.imageUrl} alt={item.title} />
        <Card.Title className="mt-5 mb-[0px]">{item.title}</Card.Title>
        <Card.InfoLayout>
          <Card.Info nickname={item.sellerNickname}>
            <Card.Grade>{item.grade}</Card.Grade>
            <span className="text-gray-300">{item.genre}</span>
          </Card.Info>
        </Card.InfoLayout>
        <Card.SaleInfoLayout>
          <Card.SaleInfo
            title={'가격'}
            type={'point'}
            count={item.pricePerCard}
          />
          <Card.SaleInfo title={'수량'} count={item.quantity} />
        </Card.SaleInfoLayout>
      </Card>
    </Link>
  );
}

export default MarketCard;
