# Action 에 따른 기능 & 동작 정리
  * ELGO_Remote를 구현한 개발자 본인은 React를 이번 Project에서 처음 구현했기에 초급 수준이다.
  * 따라서, 코드 구조 및 Sequence는 어렵지 않다. (line 수도 많지 않음)
  * Action에 대한 기능만 알고 있다면 충분히 코드만으로 업무진행이 가능하다.

## DEVICE_LOGIN
  * Page: DeviceLogin.js
  * ELGO_Control로 사용자가 입력한 ID와 Password를 전달해 그 결과를 전달받는다.
  * 결과가 성공(True)라면 DeviceRemtoeMain.js로 이동한다.

## UPDATE_WIFI_LIST
  * Page: SetDeviceWifi.js
  * 현재 연결된 Wifi를 변경하기 위해 사용된다.
  * ELGO_Control로 근처 Wifi 검색 요청을 보내면 그 결과를 전달 받을 수 있다.
  * 이후 사용자의 동작에 따라 CONNECT_WIFI Action으로 연계된다.

## CONNECT_WIFI
  * Page: SetDeviceWifi.js
  * 사용자가 선택한 ssid와 password 정보를 ELGO_Control로 전달하여 Wifi를 변경한다.
  * Wifi 변경이 성공하였다면 local 주소를 이용한 QR Code 가 기기에 Display 된다.
  * 실패하였다면 Modal dialog를 표시한다.


## MANAGE_DEVICE
  * Page: ManageDevice.js
  * DeviceLogin Action에서 사용되는 기기 접속 비밀번호를 변경하는 동작을 수행한다.


## ROTATE_DISPLAY
  * Page: RotateDisplay.js
  * 현재 기기의 화면을 회전하기 위한 동작을 수행한다.
  * 화면 회전의 기준은 기기의 Heading(윗 부분)을 기준으로 잡고 시계방향으로 45도씩 변경된다.
  * '적용' Button을 누르면 ELGO_Control을 통해 기기 화면 회전 기능이 수행된다.

## DEVICE_OPTIONS
  * Page: DeviceOptions.js
  * Sleep, Mute, Pause 기능의 동작을 수행한다.
  * 각 각의 Button을 누르면 ELGO_Control로 전달되어 동작을 수행한다.
  * Pause의 경우, Video의 Play Status 및 Subtitle의 Animation에만 영향을 미친다.
  * NewsFeed Widget이나 Date/Clock Widget 에도 영향을 줄 수 있도록 구현가능하지만 동작이 부자연스러울 것 같아 구현하지 않았다.


## USER_LOGIN
  * Page: DeviceRemoteMain.js
  * Server로 Redirect 되는 부분이다.
  * Server로 Redirect하기 전, ELGO_Control에서 os와 uuid(실제로는 udid)를 전달받고, 그 정보를 이용해 Token을 Server로부터 발급받는다.
  * 발급된 Token은 Server에 Redirect할 때 URL에 Parameter로 함께 전달
