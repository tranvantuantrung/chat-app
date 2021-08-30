import axiosClient from './axiosClient';

const userApi = {
  editProfile: (data) => {
    const url = '/user';

    return axiosClient.post(url, data);
  },
};

export default userApi;
