import Card from '@/components/commons/Card/Card';
import Bg1 from '@/assets/images/img-image1.png';

export default function Home() {
  return (
    <div>
      메인 화면
      <Card isLogo>
        <Card.Image state="soldOut" src={Bg1} alt="카드 배경 이미지" />
        <Card.InfoLayout>
          <Card.Title>타이틀길게쓰기테스트입니다아아아아아아아</Card.Title>
          <Card.Info nickname={'닉네임'}>
            <Card.Grade>RARE</Card.Grade>
            <span className="text-gray-300">장르명</span>
          </Card.Info>
          <Card.SaleInfoLayout>
            <Card.SaleInfo title={'가격'} type={'point'} count={4} />
            <Card.SaleInfo title={'수량'} count={1} />
            <Card.SaleInfo title={'잔여'} type={'quantity'} count={[1, 2]} />
          </Card.SaleInfoLayout>
        </Card.InfoLayout>
      </Card>
    </div>
  );
}
