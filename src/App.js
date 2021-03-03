import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import DeviceLogin from './components/deviceLogin'

function App() {
  return (
    <BrowserRouter>
        <Route path="/" component={DeviceLogin}/>
    </BrowserRouter>
  );
}

export default App;
