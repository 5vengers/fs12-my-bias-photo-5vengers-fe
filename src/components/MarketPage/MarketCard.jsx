import Card from '../../components/commons/Card/Card';
import Image from 'next/image';
import logoImage from '@/assets/images/img-logo.svg';
import React from 'react';

function MarketCard({ item }) {
  return (
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
      <div className="mt-[20px] flex items-center justify-center pt-[15px]">
        <Image src={logoImage} alt="브랜드 로고" width={99} height={18} />
      </div>
    </Card>
  );
}

export default MarketCard;
