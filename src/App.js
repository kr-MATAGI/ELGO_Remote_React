import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// websocket
import RemoteWebsocket from './utils/websocket/RemoteWebsocket.js';

// components
import DeviceLogin from './routes/DeviceLogin.js';
import RemoteMain from './routes/DeviceRemoteMain.js';
import SetDeviceWifi from './components/main/SetDeviceWifi.js';
import MangeDevice from './components/main/ManageDevice.js';
import RotateDisplay from './components/main/RotateDisplay.js';
import DeviceOptions from './components/manage/DeviceOptions.js';

const getIsLogin = () => {
  const isLogin = sessionStorage.getItem('isLogin');
  return Boolean(isLogin);
}

export const setIsLogin = (value) => {
  sessionStorage.setItem('isLogin', value);
}

const PublicRoute = ( { component: Component, ...rest } ) => {
  return (
    <Route
      {...rest}
      render={(props) => (getIsLogin() ? <Redirect to="/main" /> : <Component {...props} />)}
    />
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (getIsLogin() ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

function App() {
  RemoteWebsocket();

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path={["/", "/remote"]} component={DeviceLogin} exact />
        <PrivateRoute path="/main" component={RemoteMain} exact />
        <PrivateRoute path="/wifi" component={SetDeviceWifi} exact />
        <PrivateRoute path="/manageDevice" component={MangeDevice} exact />
        <PrivateRoute path="/rotate" component={RotateDisplay} exact />
        <PrivateRoute path="/options" component={DeviceOptions} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
