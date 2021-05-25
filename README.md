# ELGO_Remote (React)

## Description
  * ELGO_Control과 Websocket을 통해 기기를 제어한다.
  * ELGO_Control은 최대 1개의 ELGO_Remote 연결만 유효하다.
  * Session Storage를 이용해 /deviceLogin Page에서 직접적인 URL 접근을 막는다.
  * QR코드로 ELGO_Remote에 접속하면 접속한 URL을 통해 Websocket 접속 주소를 생성한다.

## File Tree
 ```bash
    ├─ELGO_REMOTE_REACT
    │  ├─public
    │  │  ├─index.html
    │  ├─src
    │  │  ├─animations
    │  │  │   ├─Loading.css
    │  │  │   ├─Loading.js
    │  │  ├─components
    │  │  │   ├─definitions
    │  │  │   │   ├─commonDefinition.js
    │  │  │   ├─main
    │  │  │   │   ├─ManageDevice.js
    │  │  │   │   ├─RotateDisplay.js
    │  │  │   │   ├─SetDeviceWifi.js
    │  │  │   ├─manage
    │  │  │   │   ├─DeviceOptions.js
    │  │  ├─css
    │  │  │   ├─DeviceLogin.css
    │  │  │   ├─DeviceRemoteMain.css
    │  │  │   ├─ManageDevice.css
    │  │  │   ├─Modal.css
    │  │  ├─img
    │  │  │   ├─display.svg
    │  │  │   ├─lock.svg
    │  │  │   ├─logo.svg
    │  │  │   ├─pw.svg
    │  │  │   ├─wifi_1.svg
    │  │  │   ├─wifi_2.svg
    │  │  │   ├─wifi_3.svg
    │  │  │   ├─wifi_full.svg
    │  │  ├─routes
    │  │  │   ├─DeviceLogin.js
    │  │  │   ├─DeviceRemoteMain.js
    │  │  ├─utils
    │  │  │   ├─dialog
    │  │  │   │  ├─Modal.js
    │  │  │   ├─websocket
    │  │  │   │  ├─RemoteWebsocket.js
    │  │  ├─App.js
    │  │  ├─index.js
    │  ├─.gitignore
    │  ├─package-lock.json
    │  ├─package.json
    │  ├─README.md
    │  ├─yarn.lock
```

## React를 사용하면서 아쉬운점
 * 본 Project는 React-native도 아닌 React이다. 따라서 많은 기능적 제약이 따른다.
 * 모든 기능들은 사용자의 Mobile에서 동작하는 것을 목표로 하고 있기에, 안정적이고 더 많은 기능을 원한다면 Web이 아닌 Android / IOS Application을 만드는 것이 좋다.
 * 또한, 기능 중 Wifi를 연결하는 것은 동일한 Gateway를 가지고 있지 않은 이상, Wifi가 변경되었을 시, WebSocket 연결이 어렵다.
 * 따라서 만약 추후 Android / IOS Application을 만든다면 Bluetooth 연결을 권장한다.
 * 추가적으로 알아보았을 때, React-Native는 Bluetooth 통신이 강력하지 않다고 한다. 따라서 Flutter를 고려해보는 것이 좋을지도 모른다.
