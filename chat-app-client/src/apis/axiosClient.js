import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

const storageKey = 'jwtToken';

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = localStorage.getItem(storageKey);

  config.headers['authorization'] = token;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    const { status } = error.response;
    if (status === 400) {
      throw error.response.data;
    }

    if (status === 401 || status === 403) {
      localStorage.removeItem(storageKey);

      throw error;
    }
  }
);
export default axiosClient;
