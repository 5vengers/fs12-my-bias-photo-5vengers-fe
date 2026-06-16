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

  return MAX_COUNT - count;
};
