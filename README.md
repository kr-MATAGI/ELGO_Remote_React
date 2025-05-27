# ELGO_Remote (React)

## 프로젝트 소개
ELGO_Remote는 WebSocket을 통해 ELGO_Control 기기를 원격으로 제어하기 위한 웹 애플리케이션입니다.

### 주요 기능
* ELGO_Control과 WebSocket 통신을 통한 기기 제어
* QR 코드를 통한 간편한 접속
* 디바이스 로그인 및 보안 기능
* WiFi 설정 및 디스플레이 회전 제어
* Session Storage를 이용한 보안 강화

## 기술 스택
* React 17.0.1
* React Router DOM 5.2.0
* Axios 0.21.1
* WebSocket
* CSS3

## 시작하기

### 필수 요구사항
* Node.js 12.0.0 이상
* npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행
```bash
npm start
# 또는
yarn start
```
개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

### 프로덕션 빌드
```bash
npm run build
# 또는
yarn build
```

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

## Release 위한 build 폴더 생성 후 nginx를 이용하는 방법
 * https://sihus.tistory.com/m/31
 * sudo apt install nginx
 * vi /etc/nginx/sites-enabled/default
 * 아래와 같이 수정
 ```
  server {
   listen 3000;
   location / {
      root /opt/ELGO/Remote/build; (이 부분 수정)
      index index.html;
      try_files $uri $uri/ /index.html;
    }
  }
 ```
 * sudo service nginx restart

## React를 사용하면서 아쉬운점
 * 본 Project는 React-native도 아닌 React이다. 따라서 많은 기능적 제약이 따른다.
 * 모든 기능들은 사용자의 Mobile에서 동작하는 것을 목표로 하고 있기에, 안정적이고 더 많은 기능을 원한다면 Web이 아닌 Android / IOS Application을 만드는 것이 좋다.
 * 또한, 기능 중 Wifi를 연결하는 것은 동일한 Gateway를 가지고 있지 않은 이상, Wifi가 변경되었을 시, WebSocket 연결이 어렵다.
 * 따라서 만약 추후 Android / IOS Application을 만든다면 Bluetooth 연결을 권장한다.
 * 추가적으로 알아보았을 때, React-Native는 Bluetooth 통신이 강력하지 않다고 한다. 따라서 Flutter를 고려해보는 것이 좋을지도 모른다.

## 프로젝트 구조 설명
* `/src/animations`: 로딩 애니메이션 등 UI 애니메이션 관련 컴포넌트
* `/src/components`: 
  - `/definitions`: 공통 정의 파일
  - `/main`: 주요 기능 컴포넌트 (기기 관리, 디스플레이 회전 등)
  - `/manage`: 기기 옵션 관리 컴포넌트
* `/src/css`: 컴포넌트별 스타일시트
* `/src/img`: 프로젝트에서 사용되는 이미지 리소스
* `/src/routes`: 라우팅 관련 컴포넌트
* `/src/utils`: 
  - `/dialog`: 모달 다이얼로그 유틸리티
  - `/websocket`: WebSocket 통신 관련 유틸리티
