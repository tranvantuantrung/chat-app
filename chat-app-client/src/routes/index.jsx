import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { RoomProvider } from '../contexts/RoomContext';
import { UserProvider } from '../contexts/UserContext';

import { Chat, Login, PageNotFound, Register } from '../pages';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/login' exact component={Login} />
        <PublicRoute path='/register' exact component={Register} />
        <PublicRoute path='/page-not-found' component={PageNotFound} />
        <PrivateRoute
          path='/'
          component={() => {
            return (
              <UserProvider>
                <RoomProvider>
                  <Chat />
                </RoomProvider>
              </UserProvider>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
