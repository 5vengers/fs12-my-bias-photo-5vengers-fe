import MarketDetailPageClient from '@/components/MarketDetailPage/MarketDetailPageClient';

export const metadata = {
  title: '마켓플레이스 - 포토카드 상세',
  description: '마켓플레이스 포토카드 상세 구매 페이지',
};

export default function Page({ params }) {
  return <MarketDetailPageClient itemId={params.itemId} />;
}
