import react, { useState } from 'react';
import {ACTION} from '../definitions/commDefinition.js';
import LoadingAnimation from '../../animations/Loading.js'
import {sendMessage, websocket} from '../../utils/websocket/RemoteWebsocket.js';

function DeviceOptions() {
    /**
     * @brief   Loading Animation State
     */
     const [loadingStatus, setLoadingStatus] = useState(false);
     const bRenderLoading = loadingStatus;

    /**
     * @brief   Options States
     * @note    Display ON/OFF - ON : true, OFF : false (default : true)
     *          Mute - ON : true, OFF : false (default : false)
     *          Pause - ON : true, OFF : false (default : fasle)
     */
    const [optionsState, setOptionsState] = useState({
        displayOnOff: true,
        deviceMute: false,
        contentPause: false
    });
    const {displayOnOff, deviceMute, contentPause} = optionsState;

    // button string (value)
    const [optionsStateStr, setOptionsStateStr] = useState({
        displayOnOffStr:'Display OFF',
        deviceMuteStr: 'Mute OFF',
        contentPauseStr: 'Pause'
    });
    const {displayOnOffStr, deviceMuteStr, contentPauseStr} = optionsStateStr;
    const nextStatusHandler = (name, value) => {
        setOptionsStateStr({
            ...optionsStateStr,
            [name]: value
        });
    }
    const changeDeviceOptions = (element) => {
        setLoadingStatus(true);
        setTimeout(() => {
            const {value, name} = element.target;
            // Chnage Values
            let changeValue = true;
            let nextStr;
            if ('displayOnOff' === name) {
                changeValue = (true === displayOnOff ? false : true);
                if (true === changeValue) {
                    nextStr = 'Display OFF';
                }
                else {
                    nextStr = 'Display ON';
                }
            }
            else if ('deviceMute' === name) {
                changeValue = (true === deviceMute ? false : true);
                if (true === changeValue) {
                    nextStr = 'Mute ON';
                }
                else {
                    nextStr = 'Mute OFF';
                }
            }
            else if ('contentPause' === name) {
                changeValue = (true === contentPause ? false : true);
                if (true === changeValue) {
                    nextStr = 'Play'
                }
                else {
                    nextStr = 'Pause';
                }
            }
            else {
                console.log('Error - Unkwon button name');
            }
            
            // Call setter
            const strName = name + 'Str'
            setOptionsState({
                ...optionsState,
                [name]: changeValue
            });
            nextStatusHandler(strName, nextStr);
            sendChangedOptions();
        }, 300);
        
    }

    /**
     * @brief   Send data to elgo_control
     */
    const sendChangedOptions = () => {
        const jsonRequest = JSON.stringify({
            action: ACTION.DEVICE_OPTIONS,
            deviceOptions: {
                displayOnOff: displayOnOff,
                deviceMute: deviceMute,
                contentPause: contentPause
            }
        })
        sendMessage(jsonRequest);
    }

    /**
     * @brief   Websocket onmessage override
     */
    websocket.onmessage = (event) =>{
        setLoadingStatus(false);
        const response = JSON.parse(event.data);
        console.log(response);
    }

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <div className="titleWrap">
                <h1>Device Options</h1>
            </div>
            <div className="btnWrap">
                <input type="button" name="displayOnOff" 
                        value={displayOnOffStr || ''} onClick={changeDeviceOptions} />
                <input type="button" name="deviceMute"
                        value={deviceMuteStr || ''} onClick={changeDeviceOptions} />
                <input type="button" name="contentPause"
                        value={contentPauseStr || ''} onClick={changeDeviceOptions} />
            </div>
        </div>
    );
}

export default DeviceOptions;