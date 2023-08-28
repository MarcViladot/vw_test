import Axios from 'axios';
import environment from '@/environment';

export const axios = Axios.create({
  baseURL: environment.baseApiUrl,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    return await Promise.reject(error);
  }
);
