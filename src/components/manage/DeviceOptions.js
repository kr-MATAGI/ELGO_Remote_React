import React, { useState } from 'react';
import {ACTION} from '../definitions/commDefinition.js';
import LoadingAnimation from '../../animations/Loading.js'
import {sendMessage, websocket} from '../../utils/websocket/RemoteWebsocket.js';
import { printLog } from '../../utils/logger/Logger.js'

function DeviceOptions() {
    /**
     * @brief   Loading Animation State
     */
     const [loadingStatus, setLoadingStatus] = useState(false);
     const bRenderLoading = loadingStatus;

    /**
     * @brief   Options States
     * @note    Sleep - ON : true, OFF : false (default : false)
     *          Mute - ON : true, OFF : false (default : false)
     *          Pause - ON : true, OFF : false (default : fasle)
     */
    const [displaySleep, setDisplaySleep] = useState(false);
    const [deviceMute, setDeviceMute] = useState(false);
    const [contentPause, setContentPause] = useState(false);

    // button string (value)
    const [displaySleepStr, setSleepStr] = useState('절전 모드 설정');
    const [deviceMuteStr, setMuteStr] = useState('음소거');
    const [contentPauseStr, setPauseStr] = useState('멈춤');

    const changeDeviceOptions = (element) => {
        setLoadingStatus(true);
        setTimeout(() => {
            const {value, name} = element.target;
            
            let sendValue = [displaySleep, deviceMute, contentPause];
            // Chnage Values
            if ('displaySleep' === name) {
                if(false === displaySleep) {
                    sendValue[0] = true;
                    setDisplaySleep(true);
                    setSleepStr('절전 모드 해제');
                }
                else {
                    sendValue[0] = false;
                    setDisplaySleep(false);
                    setSleepStr('절전 모드 설정');
                }
            }
            else if ('deviceMute' === name) {
                if(false === deviceMute) {
                    sendValue[1] = true;
                    setDeviceMute(true);
                    setMuteStr('음소거 해제');
                }
                else {
                    sendValue[1] = false;
                    setDeviceMute(false);
                    setMuteStr('음소거');
                }
            }
            else if ('contentPause' === name) {
                if(false === contentPause) {
                    sendValue[2] = true;
                    setContentPause(true);
                    setPauseStr("재생");
                }
                else {
                    sendValue[2] = false;
                    setContentPause(false);
                    setPauseStr("멈춤");
                }
            }
            else {
                printLog('Error - Unkwon button name');
            }
            
            sendChangedOptions(sendValue);
        }, 300);
        
    }

    /**
     * @brief   Send data to elgo_control
     */
    const sendChangedOptions = (sendValue) => {
        const jsonRequest = JSON.stringify({
            action: ACTION.DEVICE_OPTIONS,
            deviceOptions: {
                displayOnOff: sendValue[0],
                deviceMute: sendValue[1],
                contentPause: sendValue[2]
            }
        });
        sendMessage(jsonRequest);
    }

    /**
     * @brief   Websocket onmessage override
     */
    websocket.onmessage = (event) =>{
        setLoadingStatus(false);
        const response = JSON.parse(event.data);
        printLog(event.data);
    }

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>

            <div className="logoWrap">
                <div className="logoImg"></div>
            </div>
            <div className="btnWrap">
                <p>기기 재생 옵션</p>

                <input type="button" name="displaySleep" 
                        value={displaySleepStr || ''} onClick={changeDeviceOptions} />
                <input type="button" name="deviceMute"
                        value={deviceMuteStr || ''} onClick={changeDeviceOptions} />
                <input type="button" name="contentPause"
                        value={contentPauseStr || ''} onClick={changeDeviceOptions} />
            </div>
        </div>
    );
}

export default DeviceOptions;