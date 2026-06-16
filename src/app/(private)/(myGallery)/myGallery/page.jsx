'use client';

import Title from '@/components/commons/Title/Title';
import Button from '@/components/commons/Button/Button';
import Select from '@/components/commons/Select/Select';
import Pagination from '@/components/commons/Pagination/Pagination';
import Badge from '@/components/commons/Badge/Badge';
import Card from '@/components/commons/Card/Card';
import Search from '@/components/commons/Input/Search';
import Link from 'next/link';
import Bg1 from '@/assets/images/img-image1.png';

const MyGallery = () => {
  const tmpData = new Array(9);

  const onChangeTest = (e) => {
    console.log(e);
  };

  const onPageChange = (v) => {
    console.log(v);
  };

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <Title text="마이갤러리">
        <Link href="/cardCreate">
          <Button>포토카드 생성하기</Button>
        </Link>
      </Title>

      <div className="flex flex-col items-start gap-[20px] border-be border-gray-400 py-[40px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-xl font-bold">닉네임님이 보유한 포토카드</p>
          <p className="text-lg text-gray-300">(9장)</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <Badge grade={'COMMON'} count={0} />
          <Badge grade={'RARE'} count={0} />
          <Badge grade={'SUPER_RARE'} count={0} />
          <Badge grade={'LEGENDARY'} count={0} />
        </div>
      </div>

      <div className="flex items-center justify-start gap-[60px] py-[20px]">
        <Search size={'md'} onChange={(e) => onChangeTest(e)} />
        <Select size={'noLine'} desc="등급">
          <Select.Option value={'COMMON'} onChange={onChangeTest}>
            COMMON
          </Select.Option>
        </Select>
        <Select size={'noLine'} desc="장르">
          <Select.Option value={'COMMON'} onChange={onChangeTest}>
            COMMON
          </Select.Option>
        </Select>
      </div>

      <div className="mt-[40px] grid grid-cols-3 gap-[80px]">
        {tmpData.fill().map((t, i) => (
          <Card key={`card-${i}`}>
            <Card.Title>타이틀 테스트</Card.Title>
            <Card.Image src={Bg1} alt={'테스트 배경 1'} />
            <Card.InfoLayout>
              <Card.Info nickname={'닉네임'}>
                <Card.Grade>COMMON</Card.Grade>
                <span className="text-gray-300">장르</span>
              </Card.Info>
            </Card.InfoLayout>
            <Card.SaleInfoLayout>
              <Card.SaleInfo title={'가격'} type={'point'} count={7} />
              <Card.SaleInfo title={'수량'} count={1} />
            </Card.SaleInfoLayout>
          </Card>
        ))}
      </div>

      <div className="mt-[120px]">
        <Pagination onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default MyGallery;
