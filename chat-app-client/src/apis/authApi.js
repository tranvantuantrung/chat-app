import axiosClient from './axiosClient';

const authApi = {
  get: () => {
    const url = '/auth';
    return axiosClient.get(url);
  },

  register: (data) => {
    const url = '/register';
    return axiosClient.post(url, data);
  },

  login: (data) => {
    const url = '/login';
    return axiosClient.post(url, data);
  },
};

export default authApi;
