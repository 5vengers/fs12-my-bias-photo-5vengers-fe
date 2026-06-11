'use client';

import Title from '@/components/commons/Title/Title';
import Input from '@/components/commons/Input/Input';
import PasswordInput from '@/components/commons/Input/PasswordInput';
import Select from '@/components/commons/Select/Select';
import Textarea from '@/components/commons/Input/Textarea';
import Button from '@/components/commons/Button/Button';

const PhotoCardCreate = () => {
  const onChangeTest = (e) => {
    console.log(e);
  };

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <Title text="포토카드 생성" />
      <div className="mx-auto my-0 w-[520px] py-[60px]">
        <form className="flex flex-col gap-[64px]">
          <div>
            <label htmlFor="card-name">포토카드 이름</label>
            <Input
              id="card-name"
              type={'text'}
              placeholder={'포토카드 이름을 입력해주세요'}
            />
          </div>

          <div>
            <label htmlFor="card-grade">등급</label>
            <Select id="card-grade" desc={'등급을 선택해 주세요.'}>
              <Select.Option value={'All'} onChange={onChangeTest}>
                전체
              </Select.Option>
              <Select.Option value={'COMMON'}>COMMON</Select.Option>
              <Select.Option value={'SUPER_RARE'}>SUPER_RARE</Select.Option>
              <Select.Option value={'RARE'}>RARE</Select.Option>
            </Select>
          </div>

          <div>
            <label htmlFor="card-genre">장르</label>
            <Select id="card-genre" desc={'장르를 선택해 주세요.'}>
              <Select.Option value={'All'}>전체</Select.Option>
              <Select.Option value={'COMMON'}>COMMON</Select.Option>
              <Select.Option value={'SUPER_RARE'}>SUPER_RARE</Select.Option>
              <Select.Option value={'RARE'}>RARE</Select.Option>
            </Select>
          </div>

          <div>
            <label htmlFor="card-price">가격</label>
            <Input
              id="card-price"
              type={'text'}
              placeholder={'가격을 입력해 주세요'}
            />
          </div>

          <div>
            <label htmlFor="total-quantity">총 발행량</label>
            <Input
              id="total-quantity"
              type={'text'}
              placeholder={'총 발행량을 입력해 주세요'}
            />
          </div>

          <div>
            <label htmlFor="card-upload">사진 업로드</label>
            <div>
              <input type="text" id="card-upload" />
              <button type="button" className="">
                파일 선택
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="card-desc">포토카드 설명</label>
            <Textarea id="card-desc" onChange={onChangeTest} />
          </div>

          <Button disabled={true}>생성하기</Button>
        </form>
      </div>
    </div>
  );
};

export default PhotoCardCreate;
