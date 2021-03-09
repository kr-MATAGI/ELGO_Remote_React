import React, { useState } from 'react';
import {getResponse, sendMessage, response} from "../utils/websocket/RemoteWebsocket.js"
import LoadingAnimation from '../animations/Loading.js'

export default function DeviceLogin() {
    /**
     * Loading Animation
     */
    const [loadingStatus, setLoadingStatus] = useState(false);
    const bRenderLoading = loadingStatus;

    /**
     * device id & pw
     */
    const [inputs, setInputs] = useState({
        deviceId: '',
        deviecPw: ''
    });
    const { deviceId, devicePw } = inputs;

    const onValueChange = (element) =>{
        const { value, name } = element.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    /**
     * Confirm button action
     */
    const deviceLoginVerify = () => {
        console.log("Checking device ID and PW");

        if('' === deviceId || '' === devicePw) {
            alert("아이디 혹은 비밀번호를 입력해주세요.");
        }       
        else{
            setLoadingStatus(true);

            const deviceLoginJson = {
                action: 1,
                    deviceLogin: {
                        id: deviceId,
                        pw: devicePw
                    }
                }
            sendMessage(JSON.stringify(deviceLoginJson));
            console.log(getResponse());
        }
    }

    return (
        <div className="deviceLogin">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <h2>ELGO SYSTEM</h2>
                <input type="text" name="deviceId" placeholder="아이디를 입력하세요" value={deviceId || ''} onChange={onValueChange} />
                <input type="password" name="devicePw" placeholder="비밀번호를 입력하세요" value={devicePw|| ''} onChange={onValueChange} />                    
            <button onClick={deviceLoginVerify}>로그인</button>
        </div>
    );
}