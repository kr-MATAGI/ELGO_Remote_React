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
