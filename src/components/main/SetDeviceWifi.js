import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingAnimation from '../../animations/Loading.js'
import { sendMessage, websocket, URL } from '../../utils/websocket/RemoteWebsocket.js';
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
    Connecting: '무선 네트워크를 연결 중 입니다. (최대 1분)',
    ConnectSuccess: '무선 네트워크에 연결되었습니다.',
    ConnectFailed: '무선 네트워크 연결이 실패했습니다.',
    warningOpenNetwork: '개방형 네트워크 사용은 권장하지 않습니다. 계속하시겠습니까?'
}

export default function SetDeviceWifi () {
    /**
     * @brief   History
     */
    const history = useHistory();
    const [isPageRefresh, setPageRefresh] = useState(false);

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
    const [modalBtnHide, setModalBtnHide] = useState(false);
    const [modalBodyStr, setModalBodyStr] = useState('');
    const [modalConfirmStr, setModalConfirmStr] = useState('확인');
    const [modalOpen, setModalOpen] = useState(false);
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
        
            bodyStr = networkMessage.warningOpenNetwork;
            setModalInput(false);
        }
        changeModalString(headerStr, bodyStr, null)
        setModalOpen(true);
    }

    /** @brief  Close Modal */
    const reConnWebsocket = setTimeout(() => {
        if(true === isPageRefresh) {
            window.location.replace('/wifi');
        }
    }, 5000)
    const closeModal = () => {
        setLoadingStatus(true);
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
        
        // Re-connect websocket
        websocket.close();
        setPageRefresh(true);
    }

    /** @brief  Websocket onopen/onclose override */
    websocket.onopen = () => {
        console.log("WebSocket Re-Opened !");
        
        clearInterval(reConnWebsocket);
        setPageRefresh(false);
    }
    websocket.onclose = () => {
        console.log("Websocket Close by connect wifi");
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
            bodyStr = networkMessage.warningOpenNetwork;
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
                    let wifiInfo = {
                        ssid: element.ssid,
                        freq: element.freq,
                        signal: element.signal,
                        enc: element.encryption
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
            setLoadingStatus(false);

            let bodyStr = null;
            let confirmStr = null;
            if(true === response.result) {
                bodyStr = networkMessage.ConnectSuccess;

                setTimeout(() => {
                    setModalOpen(false);
                    confirmStr = '확인';

                    history.push('/main');
                }, 1000);

                changeModalString(null, bodyStr, confirmStr);
            }
            else {
                bodyStr = networkMessage.ConnectFailed;
                setModalBtnHide(false);
                onRetryModal();
            }
        }
        else{
            console.log('Error - Unkown Action');
            console.log(response);
        }
    }

    /**
     * @brief   Update Wifi List
     */
    const updateAcessibleWifiList =() => {
        if(false === isPageRefresh) {
            setLoadingStatus(true);
            
            setTimeout(() => {
                let requestLoadWifiList = JSON.stringify({
                    action: ACTION.UPDATE_WIFI_LIST,
                });
                sendMessage(requestLoadWifiList);
            }, 500);   
        }
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
    useEffect(() => {
        updateAcessibleWifiList();
    }, [])

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <Modal open={modalOpen} close={closeModal} header={modalHeader} hideBtn={modalBtnHide} 
                    confirm={modalConfirmStr} cancel={onCanelModal}
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