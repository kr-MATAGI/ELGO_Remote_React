import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// websocket
import RemoteWebsocket from './utils/websocket/RemoteWebsocket.js';

// components
import DeviceLogin from './routes/DeviceLogin.js';
import RemoteMain from './routes/DeviceRemoteMain.js';
import SetDeviceWifi from './components/main/SetDeviceWifi.js';
import MangeDevice from './components/main/ManageDevice.js';
import RotateDisplay from './components/main/RotateDisplay.js';
import DeviceOptions from './components/manage/DeviceOptions.js';

function App() {
  RemoteWebsocket();

  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/", "/remote"]} exact={true} component={DeviceLogin}/>
        <Route path="/main" component={RemoteMain}/>
        <Route path="/wifi" component={SetDeviceWifi}/>
        <Route path="/manageDevice" component={MangeDevice}/>
        <Route path="/rotate" component={RotateDisplay}/>
        <Route path="/options" component={DeviceOptions}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
