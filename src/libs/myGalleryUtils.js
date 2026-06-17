const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const curDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return {
    year,
    month,
  };
};

export const remainCount = (count) => {
  const MAX_COUNT = 3;

  return Math.max(MAX_COUNT - (count ?? 0));
};

export const replaceImage = (image) => {
  if (!image) {
    return image;
  }

  if (image[0] === '/') {
    const replaceUrl = BASE_URL + image;
    return replaceUrl;
  }
  return image;
};
