import apiClient from '../apiClient';

const BASE_URL = '/api/mycards';

const getMyGallery = async (query) => {
  let url = '/gallery';

  if (query) {
    // query 가 있으면 url 에 값 추가
    const queryString = Object.entries(query)
      .filter(([key, value]) => value != null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    url += `?${queryString}`;
  }

  const response = await apiClient.get(BASE_URL + url);

  return response.data.data;
};

const getMySales = async (query) => {
  let url = '/sales';

  if (query) {
    // query 가 있으면 url 에 값 추가
    const queryString = Object.entries(query)
      .filter(([key, value]) => value != null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    url += `?${queryString}`;
  }

  const response = await apiClient.get(BASE_URL + url);

  return response.data.data;
};

const getMyGalleryCount = async () => {
  const response = await apiClient.get(BASE_URL + '/gallery/card-count');

  return response.data.data;
};

const getMySalesCount = async () => {
  const response = await apiClient.get(BASE_URL + '/sales/card-count');

  return response.data.data;
};

const getCreationLog = async () => {
  const response = await apiClient.get(BASE_URL + '/creation-log');

  return response.data.data;
};

const createMyCard = async (data) => {
  const response = await apiClient.post(BASE_URL + '/create', data);

  return response.data;
};

const myGalleryService = {
  getMyGallery,
  getMyGalleryCount,
  getMySales,
  getMySalesCount,
  getCreationLog,
  createMyCard,
};

export default myGalleryService;
