import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import DeviceLogin from './routes/DeviceLogin';
import RemoteMain from './routes/DeviceRemoteMain';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={DeviceLogin}/>
        <Route paht="/main" component={RemoteMain}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
