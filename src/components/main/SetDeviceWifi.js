import React from 'react';

const EnterWifiPassword = () => {
    return(
        <div className="pwRootWrap">
            <div className="pwTitle">
                <p>WIFI 비밀번호를 입력해주세요.</p>
            </div>

            <div className="pwInputWrap">
                <input type="password" name="wifiPassword" placeholder="몇 자리 이상의 비밀번호 입력 요망"/>
                <button>확인</button>
            </div>
        </div>
    );
}

const LoadAvailableWifi = () => {

}

function SetDeviceWifi () {
    return(
        <div className="rootWrap">
            <div className="titleWrap">
                <p>사용가능한 네트워크</p>
            </div>

            <div className="wifiListWrap">
                {LoadAvailableWifi()}
            </div>
        </div>
        
        
    );
}

export default SetDeviceWifi;