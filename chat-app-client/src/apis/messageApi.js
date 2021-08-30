import axiosClient from './axiosClient';

const messageApi = {
  sendMessage: (data) => {
    const url = '/message';

    return axiosClient.post(url, data);
  },
};

export default messageApi;
