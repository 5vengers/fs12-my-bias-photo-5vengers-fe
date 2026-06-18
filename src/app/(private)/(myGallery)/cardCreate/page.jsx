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
import { useMutation, useQuery } from '@tanstack/react-query';
import myGalleryService from '@/libs/service/myGalleryService';
import useCardStore from '@/store/cardStore';
import { curDate, remainCount } from '@/libs/myGalleryUtils';
import useCreationLog from '@/hooks/useCreationLog';
import { cardCreateValidate } from '@/libs/formValidate';
import { NextDataPathnameNormalizer } from 'next/dist/server/normalizers/request/next-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PhotoCardCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [file, setFile] = useState(null);

  const [fileName, setFileName] = useState('');

  // submit 시 빈 필드·형식 오류를 Input에 내려줄 에러 상태
  const [formErrors, setFormErrors] = useState({});

  const { setCardName, setCardGrade } = useCardStore((state) => state.actions);

  const router = useRouter();

  // 생성 함수
  const { mutate: createCard, isPending: isCreating } = useMutation({
    mutationFn: (formData) => myGalleryService.createMyCard(formData),
    onSuccess: (result, variables) => {
      setCardName(variables.get('name'));
      setCardGrade(variables.get('grade'));

      if (!result.success) {
        router.push('/result?type=create&status=fail&domain=card');
        return;
      }

      router.push('/result?type=create&status=success&domain=card');
    },
    onError: (error, variables) => {
      setCardName(variables.get('name'));
      setCardGrade(variables.get('grade'));

      router.push('/result?type=create&status=fail&domain=card');
    },
  });

  // 생성 로그 가져오기
  const {
    data: log,
    isPending: isLogPending,
    error: isLogError,
  } = useCreationLog();

  // 유효 검증
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      grade,
      genre,
      price,
      totalQuantity,
    };

    const errors = cardCreateValidate({ ...data, file });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // image 파일 같이 보내기 위해 formData 사용
    const formData = new FormData();

    formData.append('imageUrl', file);

    Object.keys(data).forEach((key) => {
      const value = data[key];
      formData.append(key, value);
    });

    setFormErrors({});
    createCard(formData);
  };

  const handleGradeChange = (v) => {
    setGrade(v);
    if (formErrors.grade) {
      setFormErrors((prev) => ({ ...prev, grade: undefined }));
    }
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    if (formErrors.genre) {
      setFormErrors((prev) => ({ ...prev, genre: undefined }));
    }
  };

  const remain = log?.count === null ? '-' : remainCount(log?.count);
  const yearMonth = curDate();

  return (
    <div className="mx-auto my-0 w-[1480px] py-[60px]">
      <Title text="포토카드 생성">
        <div className="justify-items flex items-end gap-[10px]">
          <div className="font-baskin">
            <span className="text-main text-[40px]">{remain}</span>
            <span className="text-[28px] font-normal">/3</span>
          </div>
          <div>
            <span className="text-gray-300">
              ({yearMonth.year}년 {yearMonth.month}월)
            </span>
          </div>
        </div>
      </Title>
      <div className="mx-auto my-0 w-[520px] py-[60px]">
        <form className="flex flex-col gap-[65px]">
          <FormField label={'포토카드 이름'} labelFor={'card-name'}>
            <Input
              id="card-name"
              type={'text'}
              placeholder={'포토카드 이름을 입력해주세요'}
              value={name}
              setValue={(v) => {
                setName(v);
                if (formErrors.name) {
                  setFormErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              externalError={
                formErrors.name
                  ? {
                      isError: true,
                      errMsg: formErrors.name,
                    }
                  : undefined
              }
            />
          </FormField>

          <FormField label={'등급'} labelFor={'card-grade'}>
            <Select
              id="card-grade"
              desc={'등급을 선택해 주세요.'}
              onChange={handleGradeChange}
              isError={formErrors.grade ? true : false}
            >
              {Object.values(CardGrade).map((g, i) => (
                <Select.Option key={`grade-${g}-${i}`} value={g}>
                  {g}
                </Select.Option>
              ))}
            </Select>
            {formErrors.grade && (
              <span className="text-red text-sm">{formErrors.grade}</span>
            )}
          </FormField>

          <FormField label={'장르'} labelFor={'card-genre'}>
            <Select
              id="card-genre"
              desc={'장르를 선택해 주세요.'}
              onChange={handleGenreChange}
              isError={formErrors.genre ? true : false}
            >
              {Object.values(Genre).map((g, i) => (
                <Select.Option key={`genre-${g}-${i}`} value={g}>
                  {g}
                </Select.Option>
              ))}
            </Select>
            {formErrors.genre && (
              <span className="text-red text-sm">{formErrors.genre}</span>
            )}
          </FormField>

          <FormField label={'가격'} labelFor={'card-price'}>
            <Input
              id="card-price"
              type={'number'}
              placeholder={'가격을 입력해 주세요'}
              value={price}
              setValue={(v) => {
                setPrice(v);
                if (formErrors.price) {
                  setFormErrors((prev) => ({ ...prev, price: undefined }));
                }
              }}
              externalError={
                formErrors.price
                  ? {
                      isError: true,
                      errMsg: formErrors.price,
                    }
                  : undefined
              }
              min={1}
            />
          </FormField>

          <FormField label={'총 발행량'} labelFor={'card-quantity'}>
            <Input
              id="card-quantity"
              type={'number'}
              value={totalQuantity}
              placeholder={'총 발행량을 입력해 주세요'}
              setValue={(v) => {
                setTotalQuantity(v);
                if (formErrors.totalQuantity) {
                  setFormErrors((prev) => ({
                    ...prev,
                    totalQuantity: undefined,
                  }));
                }
              }}
              externalError={
                formErrors.totalQuantity
                  ? {
                      isError: true,
                      errMsg: formErrors.totalQuantity,
                    }
                  : undefined
              }
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
              <p
                className={`h-[60px] min-w-[360px] cursor-pointer rounded-xs border px-[18px] py-[20px] text-gray-300 ${formErrors.file ? 'border-red' : 'border-gray-200'}`}
              >
                {fileName === '' ? '사진 업로드' : fileName}
              </p>
              <input
                type="file"
                id="card-upload"
                name="imageUrl"
                accept="image/png, image/jpeg, image/svg"
                onChange={(e) => {
                  const selectFile = e.target.files?.[0] ?? null;
                  setFile(selectFile);
                  setFileName(selectFile?.name ?? '');
                  setFormErrors((prev) => ({ ...prev, file: undefined }));
                }}
                className="hidden"
              />
              <p className="border-main text-main h-[60px] cursor-pointer rounded-xs border bg-black px-[28px] py-[18px]">
                파일 선택
              </p>
            </label>
            {formErrors.file && (
              <span className="text-red text-sm">{formErrors.file}</span>
            )}
          </div>

          <FormField label={'포토카드 설명'} labelFor={'card-desc'}>
            <Textarea
              id="card-desc"
              setValue={(v) => {
                setDescription(v);
                if (formErrors.description) {
                  setFormErrors((prev) => ({
                    ...prev,
                    description: undefined,
                  }));
                }
              }}
              externalError={
                formErrors.description
                  ? {
                      isError: true,
                      errMsg: formErrors.description,
                    }
                  : undefined
              }
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
