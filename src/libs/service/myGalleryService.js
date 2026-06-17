import apiClient from '../apiClient';

const BASE_URL = '/api/mygallery';

const getMyGallery = async (query) => {
  let url = '';

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
  const response = await apiClient.get(BASE_URL + '/card-count');

  return response.data.data;
};

const getCreationLog = async () => {
  const response = await apiClient.get(BASE_URL + '/creation-log');

  return response.data.data;
};

const createMyCard = async () => {};

const myGalleryService = {
  getMyGallery,
  getMyGalleryCount,
  getCreationLog,
  createMyCard,
};

export default myGalleryService;
