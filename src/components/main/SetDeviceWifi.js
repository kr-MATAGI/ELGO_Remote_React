import React, {useEffect, useState} from 'react';
import LoadingAnimation from '../../animations/Loading.js'
import {sendMessage, websocket} from '../../utils/websocket/RemoteWebsocket.js';
import {ACTION} from '../definitions/commDefinition.js';

export default function SetDeviceWifi () {
    /**
     * @brief   Loading Animation State
     */
    const [loadingStatus, setLoadingStatus] = useState(false);
    const bRenderLoading = loadingStatus;

    /**
     * @brief   Title message
     */
    const networkMessage = {
        Searching: '무선 네트워크 검색 중 입니다.',
        SearchFail: '무선 네트워크 검색을 실패했습니다.',
        Connecting: '무선 네트워크를 연결 중 입니다. 현재 페이지를 유지해주세요.(최대 1분)',
        ConnectSuccess: '무선 네트워크에 연결되었습니다.',
        ConnectFailed: '무선 네트워크 연결이 실패했습니다.',
        warningOpenNetwork: '개방향 네트워크 사용은 권장하지 않습니다. 계속하시겠습니까?'
    }
    const [ titleMessage, setTitleMessage ] = useState(networkMessage.Searching);

    /**
     * @brief   Webscoet onmessage override
     */
    websocket.onmessage = (event) =>{
        setLoadingStatus(false);
        
        const response = JSON.parse(event.data);
        console.log(response);
    }

    /**
     * @brief   Load Wifi List
     */
    const loadAvailableWifiList = () => {
        setLoadingStatus(true);
        setTimeout(() => {
            let requestLoadWifiList = JSON.stringify({
                action: ACTION.UPDATE_WIFI_LIST,
            });
            sendMessage(requestLoadWifiList);
        }, 500);   
    }

    /**
     * @brief   Enter Wifi password and verify
     */
    const enterWifiPassword = () => {

    }

    useEffect(() => {
        loadAvailableWifiList();
    }, [])

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <div className="titleWrap">
                <p>{titleMessage}</p>
            </div>

            <div className="wifiListWrap">

            </div>
        </div>
    );
}