import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RemoteWebsocket from './utils/websocket/RemoteWebsocket.js'
import DeviceLogin from './routes/DeviceLogin.js';
import RemoteMain from './routes/DeviceRemoteMain.js';

function App() {
  useEffect(() => {
    RemoteWebsocket();
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/", "/remote"]} exact={true} component={DeviceLogin}/>
        <Route paht="/main" component={RemoteMain}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
