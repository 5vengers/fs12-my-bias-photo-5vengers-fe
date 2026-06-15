import apiClient from '../apiClient';

const getMyPoint = async () => {
  const response = await apiClient.get('/api/points/me');

  return response.data.data;
};

const pointService = {
  getMyPoint,
};

export default pointService;
