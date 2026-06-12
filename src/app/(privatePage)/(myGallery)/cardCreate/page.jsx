'use client';

import Title from '@/components/commons/Title/Title';
import Input from '@/components/commons/Input/Input';
import Select from '@/components/commons/Select/Select';
import Textarea from '@/components/commons/Input/Textarea';
import Button from '@/components/commons/Button/Button';
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
        <form className="flex flex-col gap-[64px]">
          <div>
            <label className="font-bold" htmlFor="card-name">
              포토카드 이름
            </label>
            <Input
              id="card-name"
              type={'text'}
              placeholder={'포토카드 이름을 입력해주세요'}
              setValue={setName}
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <label className="font-bold" htmlFor="card-grade">
              등급
            </label>
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
          </div>

          <div className="flex flex-col gap-[20px]">
            <label htmlFor="card-genre">장르</label>
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
          </div>

          <div>
            <label className="font-bold" htmlFor="card-price">
              가격
            </label>
            <Input
              id="card-price"
              type={'number'}
              placeholder={'가격을 입력해 주세요'}
              setValue={setPrice}
              min={1}
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="total-quantity">
              총 발행량
            </label>
            <Input
              id="total-quantity"
              type={'number'}
              placeholder={'총 발행량을 입력해 주세요'}
              setValue={setTotalQuantity}
              min={1}
              max={10}
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="file-box">
              사진 업로드
            </label>
            <div
              id="file-box"
              className="mt-[20px] flex items-center justify-between"
            >
              <input
                id="image-upload"
                type="text"
                value={cardName}
                placeholder={'사진 업로드'}
                disabled
                className="h-[60px] min-w-[360px] rounded-xs border border-gray-200 px-[18px] py-[20px] text-gray-300"
              ></input>
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
              <label
                htmlFor="card-upload"
                className="border-main text-main h-[60px] rounded-xs border bg-black px-[28px] py-[18px]"
              >
                파일 선택
              </label>
            </div>
          </div>

          <div>
            <label className="font-bold" htmlFor="card-desc">
              포토카드 설명
            </label>
            <Textarea
              id="card-desc"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

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
