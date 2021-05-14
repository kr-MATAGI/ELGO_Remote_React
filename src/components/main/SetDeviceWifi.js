import React, { useEffect, useState } from 'react';
import LoadingAnimation from '../../animations/Loading.js'
import { websocket, sendMessage } from '../../utils/websocket/RemoteWebsocket.js';
import { ACTION } from '../definitions/commDefinition.js';
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
    Connecting: '사이니지 화면에 QR이 표시되면 다시 접속해주세요.',
    ConnectSuccess: '무선 네트워크에 연결되었습니다.',
    ConnectFailed: '무선 네트워크 연결이 실패했습니다.',
    WarningOpenNetwork: '개방형 네트워크 사용은 권장하지 않습니다. 계속하시겠습니까?'
}

export default function SetDeviceWifi () {
    /**
     * @brief   Loading Animation State
     */
    const [loadingStatus, setLoadingStatus] = useState(false);

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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('') 
    const [modalBodyStr, setModalBodyStr] = useState('');
    const [modalBtnHide, setModalBtnHide] = useState(false);
    const [modalConfirmStr, setModalConfirmStr] = useState('확인');
    const [modalInput, setModalInput] = useState(true);

    /** @brief  Modeal String Change */
    const changeModalString = (header, body, confirm) => {
        if(null !== header) {
            setModalHeader(header);
        }

        if(null !== body) {
            setModalBodyStr(body)
        }

        if(null !== confirm) {
            setModalConfirmStr(confirm);
        }
    }

    /** @brief  Open Modal */
    const openModal = (ssid) => {
        const findWifi = wifiInfoList.find((element) => {
            return element.ssid === ssid;
        });
        const wifi = {
            ssid: findWifi.ssid,
            enc: findWifi.enc
        }
        setSelectedWifi(wifi);
        
        let headerStr = '';
        let bodyStr  = null;
        if(true === wifi.enc) {
            headerStr = ssid;
            headerStr += ' 의 비밀번호를 입력해주세요.';
            bodyStr = '';
            setModalInput(true);
        }
        else {
            headerStr = ssid;
            headerStr += ' 를 선택하셨습니다.';
        
            bodyStr = networkMessage.WarningOpenNetwork;
            setModalInput(false);
        }
        changeModalString(headerStr, bodyStr, null)
        setModalOpen(true);
    }

    /** @brief  Close Modal */
    const closeModal = () => {
        setModalBtnHide(true);

        let headerStr = selectedWifi.ssid + ' 에 연결 합니다.';
        let password = '';
        if(true === selectedWifi.enc) {
            password = getModalInputValue();
            setModalInputValue('');
            setModalInput(false);
        }

        setModalHeader(headerStr);
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

    /** @brief  Cancel Modal */
    const onCanelModal = () => {
        setModalOpen(false);
        setModalConfirmStr('확인');
        setModalInputValue('');
        setModalInput(false);
    }

    /** @brief  Retry Modal */
    const onRetryModal = () => {
        let headerStr = selectedWifi.ssid + ' 에 연결 실패하였습니다.'
        let bodyStr = null;

        if(true === selectedWifi.enc) {
            bodyStr = '비밀번호를 다시 입력해주세요.';
            setModalInput(true);
        }
        else {
            bodyStr = networkMessage.WarningOpenNetwork;
        }

        changeModalString(headerStr, bodyStr, '재시도');
    }

    /**
     * @brief   Title Message
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
                    if('' !== element.ssid) {
                        let wifiInfo = {
                            ssid: element.ssid,
                            freq: element.freq,
                            signal: element.signal,
                            enc: element.encryption
                        }
                        wifiList.push(wifiInfo);
                    }
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
            setLoadingStatus(false);

            let bodyStr = null;
            if(false === response.result) {
                bodyStr = networkMessage.ConnectFailed;
                setModalBodyStr(bodyStr);
                setModalBtnHide(false);
                onRetryModal();
            }
        }
        else{
            console.log('Error - Unkown Action', response);
        }
    }

    /**
     * @brief   Update Wifi List
     */
    const updateAcessibleWifiList =() => {
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
                        (() => {
                            if(4 === wifiDegree)
                                return (<WifiDeg4 width="50"/>);
                            else if(3 === wifiDegree) 
                                return (<WifiDeg3 width="50"/>);
                            else if(2 === wifiDegree) 
                                return (<WifiDeg2 width="50"/>);
                            else 
                                return (<WifiDeg1 width="50"/>);
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
     * @brief   useEffect()
     */
    useEffect(() => {
        updateAcessibleWifiList();
    }, [])

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={loadingStatus}></LoadingAnimation>
            <Modal open={modalOpen} close={closeModal} header={modalHeader} hideBtn={modalBtnHide} 
                    confirm={modalConfirmStr} cancel={onCanelModal}
                    isInput={modalInput} inputType="password" placeholderStr="Password...">
                {modalBodyStr}
            </Modal>

            <div className="logoWrap">
                <div className="logoImg"></div>
            </div>

            <div className="btnWrap wifi">
                <div className="titleWrap">
                    <p>{titleMessage}</p>
                </div>

                <div className="wifiWrap">
                    {displayWifiList}               
                </div>
            </div>
        </div>
    );
}