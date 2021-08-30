import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authApi, userApi } from '../apis/';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        const user = await authApi.get();

        setUser(user);
      } catch (error) {
        history.push('/login');
      }
    };

    fetchUserAuth();
  }, []);

  const editProfile = (
    data,
    setLoading,
    setError,
    resetForm,
    setFileList,
    handleCancel
  ) => {
    const editProfileApi = async () => {
      setLoading(true);

      try {
        const { updatedUser, logout } = await userApi.editProfile(data);

        if (logout) {
          const storageKey = 'jwtToken';

          localStorage.removeItem(storageKey);
          history.push('/login');
        }

        setUser(updatedUser);
        setLoading(false);
        resetForm();
        setFileList([]);
        handleCancel();
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    editProfileApi();
  };

  return (
    <UserContext.Provider value={{ user, editProfile }}>
      {children}
    </UserContext.Provider>
  );
};
