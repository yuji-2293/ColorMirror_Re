import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

const headers = {
  'Content-Type': 'application/json',
};

export const ApiClient = axios.create({ baseURL, headers });

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    switch (error.response?.status) {
      case 401:
        break;
      case 404:
        break;
      default:
        console.log('== internal server error ==');
    }
    const errorMessage = (error.response?.data?.message || '').split(',');
    throw new Error(errorMessage);
  }
);
