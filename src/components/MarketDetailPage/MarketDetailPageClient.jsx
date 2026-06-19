'use client';

import { useMarketItemDetail } from '@/hooks/useMarket';
import useAuthStore from '@/store/authStore';
import BuyerMarketDetailPage from './BuyerMarketDetailPage';
import SellerMarketDetailPage from './SellerMarketDetailPage';

const MarketDetailPageClient = ({ itemId }) => {
  const user = useAuthStore((state) => state.user);
  const { data: item, isPending, isError } = useMarketItemDetail(itemId);

  if (isPending) {
    return <main className="px-[220px] py-[80px] text-white">로딩 중...</main>;
  }

  if (isError || !item) {
    return (
      <main className="px-[220px] py-[80px] text-white">
        포토카드 정보를 불러오지 못했습니다.
      </main>
    );
  }

  // BE 상세 응답의 sellerId와 로그인 유저 id를 비교해 판매자/구매자 화면을 분기합니다.
  const isSeller = Boolean(
    user?.id && item.sellerId && user.id === item.sellerId,
  );

  if (isSeller) {
    return <SellerMarketDetailPage item={item} itemId={itemId} />;
  }

  return <BuyerMarketDetailPage item={item} itemId={itemId} />;
};

export default MarketDetailPageClient;
