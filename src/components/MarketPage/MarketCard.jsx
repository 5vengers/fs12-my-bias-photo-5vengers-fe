import Link from 'next/link';
import { useState } from 'react';
import Card from '@/components/commons/Card/Card';
import { GENRE_OPTIONS } from '@/constants/marketOptions';
import { useIsAuthenticated } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Modal from '../commons/Modal/Modal';
function MarketCard({ item }) {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const remaining = item.quantity - item.soldQuantity;
  const isSoldOut = remaining <= 0;

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

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
      {isLoginModalOpen && (
        <Modal>
          <Modal.Close onClose={() => setIsLoginModalOpen(false)} />
          <Modal.Title>로그인이 필요합니다.</Modal.Title>
          <Modal.Desc className="text-center whitespace-pre-line">
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </Modal.Desc>
          <Modal.Button size="sm" onClick={() => router.push('/login')}>
            확인
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
}

export default MarketCard;
