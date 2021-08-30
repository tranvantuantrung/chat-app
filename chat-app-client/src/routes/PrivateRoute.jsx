import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const storageKey = 'jwtToken';
  const isAuth = localStorage.getItem(storageKey);

  if (!isAuth) {
    return <Redirect to='/login' />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
