'use client';

import Title from '@/components/commons/Title/Title';
import Input from '@/components/commons/Input/Input';
import Select from '@/components/commons/Select/Select';
import Textarea from '@/components/commons/Input/Textarea';
import Button from '@/components/commons/Button/Button';
import FormField from '@/components/commons/FormField/FormField';

import { Genre, CardGrade } from '@/constants/enums';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PhotoCardCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [file, setFile] = useState(null);

  const [cardName, setCardName] = useState('');

  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  // 추후 로딩 추가

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsCreating(true);

    const data = {
      name,
      description,
      grade,
      genre,
      price,
      totalQuantity,
    };

    // image 파일 같이 보내기 위해 formData 사용
    const formData = new FormData();
    if (!file) {
      setIsCreating(false);
      return;
    }

    formData.append('imageUrl', file);

    Object.keys(data).forEach((key) => {
      const value = data[key];
      formData.append(key, value);
    });

    try {
      const res = await fetch(`${API_URL}/api/myGallery/create`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        // 실패로 보낸다?
        return;
      }

      const result = await res.json();
      // error 처리 추가 예정

      if (!result.success) {
        // 여기도 실패로 보낸다?
        return;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsCreating(false);
    }

    // 추후 포토카드 생성 완료 페이지로 route 되어야 함
    router.push('/myGallery');
  };

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <Title text="포토카드 생성" />
      <div className="mx-auto my-0 w-[520px] py-[60px]">
        <form className="flex flex-col gap-[20px]">
          <FormField label={'포토카드 이름'} labelFor={'card-name'}>
            <Input
              id="card-name"
              type={'text'}
              placeholder={'포토카드 이름을 입력해주세요'}
              setValue={setName}
            />
          </FormField>

          <FormField label={'등급'} labelFor={'card-grade'}>
            <Select
              id="card-grade"
              desc={'등급을 선택해 주세요.'}
              onChange={setGrade}
            >
              {Object.values(CardGrade).map((g, i) => (
                <Select.Option key={`grade-${g}-${i}`} value={g}>
                  {g}
                </Select.Option>
              ))}
            </Select>
          </FormField>

          <FormField label={'장르'} labelFor={'card-genre'}>
            <Select
              id="card-genre"
              desc={'장르를 선택해 주세요.'}
              onChange={setGenre}
            >
              {Object.values(Genre).map((g, i) => (
                <Select.Option key={`genre-${g}-${i}`} value={g}>
                  {g}
                </Select.Option>
              ))}
            </Select>
          </FormField>

          <FormField label={'가격'} labelFor={'card-price'}>
            <Input
              id="card-price"
              type={'number'}
              placeholder={'가격을 입력해 주세요'}
              setValue={setPrice}
              min={1}
            />
          </FormField>

          <FormField label={'총 발행량'} labelFor={'card-quantity'}>
            <Input
              id="card-quantity"
              type={'number'}
              placeholder={'총 발행량을 입력해 주세요'}
              setValue={setTotalQuantity}
              min={1}
              max={10}
            />
          </FormField>

          <div>
            <p className="font-bold">사진 업로드</p>
            <label
              htmlFor="card-upload"
              className="mt-[20px] flex items-center justify-between"
            >
              <p className="h-[60px] min-w-[360px] cursor-pointer rounded-xs border border-gray-200 px-[18px] py-[20px] text-gray-300">
                {cardName === '' ? '사진 업로드' : cardName}
              </p>
              <input
                type="file"
                id="card-upload"
                name="imageUrl"
                accept="image/png, image/jpeg, image/svg"
                onChange={(e) => {
                  const selectFile = e.target.files?.[0] ?? null;
                  setFile(selectFile);
                  setCardName(selectFile?.name ?? '');
                }}
                className="hidden"
              />
              <p className="border-main text-main h-[60px] cursor-pointer rounded-xs border bg-black px-[28px] py-[18px]">
                파일 선택
              </p>
            </label>
          </div>

          <FormField label={'포토카드 설명'} labelFor={'card-desc'}>
            <Textarea
              id="card-desc"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>

          <Button
            btnType="submit"
            disabled={isCreating}
            onClick={(e) => handleSubmit(e)}
          >
            {isCreating ? '생성 중 . . .' : '생성하기'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PhotoCardCreate;
