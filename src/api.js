import axios from 'axios';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
