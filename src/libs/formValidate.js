export const cardCreateValidate = (data) => {
  const { name, grade, genre, price, totalQuantity, file, description } = data;
  const errors = {};
  const isBlank = (v) => typeof v === 'string' && v.trim() === '';

  if (!name || isBlank(name)) {
    errors.name = '필수 입력사항입니다.';
  } else if (name.trim().length > 20) {
    errors.name = '포토 카드 이름은 20자 이하이어야 합니다.';
  }

  if (!grade) {
    errors.grade = '필수 입력사항입니다.';
  }

  if (!genre) {
    errors.genre = '필수 입력사항입니다.';
  }

  if (!price) {
    errors.price = '필수 입력사항입니다.';
  } else if (price < 1) {
    errors.price = '포토 카드 가격은 1 P 이상이어야 합니다.';
  }

  if (!totalQuantity) {
    errors.totalQuantity = '필수 입력사항입니다.';
  } else if (totalQuantity < 1) {
    errors.totalQuantity = '총 수량은 1개 이상이어야 합니다.';
  } else if (totalQuantity > 10) {
    errors.totalQuantity = '총 수량은 10개 이하이어야 합니다.';
  }

  if (!file) {
    errors.file = '필수 입력사항입니다.';
  }

  if (!description || isBlank(description)) {
    errors.description = '필수 입력사항입니다.';
  } else if (description.length > 300) {
    errors.description = '포토카드 설명은 300자를 넘을 수 없습니다.';
  }

  return errors;
};
