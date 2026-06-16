import apiClient from '../apiClient';

// 사용자 포인트 조회 함수
const getMyPoint = async () => {
  const response = await apiClient.get('/api/points/me');

  return response.data.data;
};

// 포인트 박스 오픈 함수
const openPointBox = async (boxNumber) => {
  const response = await apiClient.post('/api/points/box', {
    boxNumber,
  });

  return response.data.data;
};

const pointService = {
  getMyPoint,
  openPointBox,
};

export default pointService;
