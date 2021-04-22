import React, {useEffect, useState} from 'react';
import LoadingAnimation from '../../animations/Loading.js'
import {sendMessage, websocket} from '../../utils/websocket/RemoteWebsocket.js';
import {ACTION} from '../definitions/commDefinition.js';
import { Modal, getModalInputValue, setModalInputValue } from '../../utils/dialog/Modal.js';

import { ReactComponent as WifiDeg4 } from '../../img/wifi_full.svg';
import { ReactComponent as WifiDeg3 } from '../../img/wifi_3.svg';
import { ReactComponent as WifiDeg2 } from '../../img/wifi_2.svg';
import { ReactComponent as WifiDeg1 } from '../../img/wifi_1.svg';
import { ReactComponent as LockIcon } from '../../img/lock.svg';

/**
 * @brief   Network message
 */
const networkMessage = {
    Searching: '무선 네트워크 검색 중 입니다.',
    SearchOk: '사용가능한 네트워크 목록',
    SearchFail: '무선 네트워크 검색을 실패했습니다.',
    Connecting: '무선 네트워크를 연결 중 입니다. (최대 1분)',
    ConnectSuccess: '무선 네트워크에 연결되었습니다.',
    ConnectFailed: '무선 네트워크 연결이 실패했습니다.',
    warningOpenNetwork: '개방향 네트워크 사용은 권장하지 않습니다. 계속하시겠습니까?'
}

export default function SetDeviceWifi () {
    /**
     * @brief   Loading Animation State
     */
    const [loadingStatus, setLoadingStatus] = useState(false);
    const bRenderLoading = loadingStatus;

    /**
     * @brief   Wifi Info
     */
    const [selectedWifi, setSelectedWifi] = useState({
        ssid: '',
        enc: false
    });
    const [wifiInfoList, setWifiInfoList] = useState([]);
    const displayWifiList = wifiInfoList.map( (element, key) => {
        return (
            <WifiLabel key={key} ssid={element.ssid} freq={element.freq} 
                    signal={element.signal} enc={element.enc} />
        )
    });

    /**
     * @brief   Dialog (Modal)
     */
    const [modalHeader, setModalHeader] = useState('');
    const [modalBodyStr, setModalBodyStr] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState(true);
    const openModal = (ssid) => {
        const findWifi = wifiInfoList.find((element) => {
            return element.ssid === ssid;
        });
        const wifi = {
            ssid: findWifi.ssid,
            enc: findWifi.enc
        }
        setSelectedWifi(wifi);
        
        let headerStr = ssid;
        headerStr += " 의 비밀번호를 입력해주세요.";
        setModalHeader(headerStr);
        setModalOpen(true);
    }
    const closeModal = () => {
        setLoadingStatus(true);

        const password = getModalInputValue();
        const headerStr = selectedWifi.ssid + " 에 연결 합니다."
        setModalInputValue('');
        setModalHeader(headerStr);
        setModalInput(false);
        setModalBodyStr(networkMessage.Connecting);

        const connectWifiJson = {
            action: ACTION.CONNECT_WIFI,
            wifi: {
                ssid: selectedWifi.ssid,
                password: password,
                encryption: selectedWifi.enc 
            }
        }
        sendMessage(JSON.stringify(connectWifiJson));        
    }

    /**
     * @brief   Title
     */
    const [ titleMessage, setTitleMessage ] = useState(networkMessage.Searching);

    /**
     * @brief   Webscoet onmessage override
     */
    websocket.onmessage = (event) =>{
        setLoadingStatus(false);
        
        const response = JSON.parse(event.data);
        console.log(response);

        if(ACTION.UPDATE_WIFI_LIST === response.action) {
            if(true === response.result) {
                setTitleMessage(networkMessage.SearchOk);
    
                // sort by signal
                let wifiList = [];
                response.wifiList.forEach(element => {
                    let ssid = element.ssid;
                    let freq = element.freq;
                    let signal = element.signal;
                    let enc = element.enc;
                
                    let wifiInfo = {
                        ssid: ssid,
                        freq: freq,
                        signal: signal,
                        enc: enc
                    }
                    wifiList.push(wifiInfo);
                });
    
                wifiList.sort((lhs, rhs) => {
                    return rhs.signal - lhs.signal;
                });
    
                setWifiInfoList(wifiList);
            }
            else {
                setTitleMessage(networkMessage.SearchFail);
            }
        }
        else if(ACTION.CONNECT_WIFI === response.action) {
            setModalOpen(false);
            setLoadingStatus(false);
            // setModalInput(true)
        }        
    }

    /**
     * @brief   Update Wifi List
     */
    const updateAcessibleWifiList = () => {
        setLoadingStatus(true);
        setTimeout(() => {
            let requestLoadWifiList = JSON.stringify({
                action: ACTION.UPDATE_WIFI_LIST,
            });
            sendMessage(requestLoadWifiList);
        }, 500);   
    }

    function WifiLabel( {ssid, freq, signal, enc} ) {
        // wifi icon
        const newSignal = signal * -1;
        let wifiDegree;
        if( 60 >= newSignal ) {
            wifiDegree = 4;
        }
        else if( 60 < newSignal && 70 >= newSignal ) {
            wifiDegree = 3;
        }
        else if( 70 < newSignal && 80 >= newSignal ) {
            wifiDegree = 2;
        }
        else {
            wifiDegree = 1;
        }

        return (
            <span onClick={() => {openModal(ssid)}}>
                <li>
                    {
                        (function() {
                            if(4 === wifiDegree) return (<WifiDeg4 width="50"/>)
                            else if(3 === wifiDegree) return (<WifiDeg3 width="50"/>)
                            else if(2 === wifiDegree) return (<WifiDeg2 width="50"/>)
                            else return (<WifiDeg1 width="50"/>)
                        })()
                    }
                    {
                        (function () {
                            if(true === enc) return (<LockIcon width="20"/>) 
                        })()
                    }
                    {ssid}
                    {" "}{freq / 1000}GHz
                </li>
            </span>
        )
    }

    /**
     * @brief   Enter Wifi password and verify
     */
    const enterWifiPassword = () => {

    }

    useEffect(() => {
        updateAcessibleWifiList();
    }, [])

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <Modal open={modalOpen} close={closeModal} header={modalHeader} confirm="확인" 
                    isInput={modalInput} inputType="password" placeholderStr="Password...">
                {modalBodyStr}
            </Modal>

            <div className="titleWrap">
                <p>{titleMessage}</p>
            </div>

            <div className="wifiWrap">
                {displayWifiList}               
            </div>
        </div>
    );
}