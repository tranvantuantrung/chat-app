import axiosClient from './axiosClient';

const roomApi = {
  get: () => {
    const url = '/room';
    return axiosClient.get(url);
  },

  getRooms: (id) => {
    const url = `/room/${id}/rooms`;
    return axiosClient.get(url);
  },

  getRoom: (id) => {
    const url = `/room/${id}`;
    return axiosClient.get(url);
  },

  getMembers: (id) => {
    const url = `/room/${id}/members`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = '/room/create';
    return axiosClient.post(url, data);
  },

  join: (data) => {
    const url = '/room/join';
    return axiosClient.post(url, data);
  },
};

export default roomApi;
