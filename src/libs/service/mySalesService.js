import apiClient from '../apiClient';

const getMyMarketItems = async () => {
  const response = await apiClient.get('/api/market/items/me');
  return response.data.data;
};

const mySalesService = {
  getMyMarketItems,
};

export default mySalesService;
