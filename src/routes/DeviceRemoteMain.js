import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ACTION } from '../components/definitions/commDefinition.js';
import { sendMessage, websocket } from '../utils/websocket/RemoteWebsocket.js';
import LoadingAnimation from '../animations/Loading.js';
import { Modal } from '../utils/dialog/Modal.js';
import { printLog } from '../utils/logger/Logger.js'

// css
import '../css/DeviceRemoteMain.css';

/**
 * @brief   Main page
 */
function DeviceRemoteMain() {
    /**
     * @brief   Loading Animation
     */
    const [showLoadingAni, setShowLoadingAni] = useState(false);

    /**
     * @brief   Modal
     */
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const onModalClose = () => {
        setModalOpen(false)
        setModalHeader('');
        setModalBody('');
    }
    const onModalOpenControl = (isOpen, header, body) => {
        setModalOpen(isOpen);
        setModalHeader(header);
        setModalBody(body);
    }

    /**
     * @brief   Websocket onmessage override
     */
    const EXT_HOST = 'https://demo.elgo.co.kr/client/jwt/user'
    websocket.onmessage = (event) =>{
        setShowLoadingAni(false);
        
        let response = JSON.parse(event.data);
        printLog(event.data);

        if(ACTION.USER_LOGIN === response.action) {
            if(true === response.result) {
                // get token from server using axios
                let body = {
                    os: response.os,
                    uuid: response.udid // plz see a uuid, udid defintion
                }
                printLog(body.os, body.uuid);

                axios.post(EXT_HOST, body).then((axiosResponse) => {
                    printLog(axiosResponse);

                    let newToken = axiosResponse.data.newToken;
                    // link to external webserver with jwt
                    let loginPageUrl = 'https://demo.elgo.co.kr/client/login?token=';
                    loginPageUrl += newToken;
                    printLog('logingPageUrl', loginPageUrl);
                   
                    // access external web
                    window.location.assign(loginPageUrl);
                }).catch((error) => {
                    printLog(error);

                    let headerStr = '접속 실패';
                    let bodyStr = '서버에 접속 실패 하였습니다.';
                    onModalOpenControl(true, headerStr, bodyStr);
                });
            }
            else {
                let headerStr = '접속 실패';
                let bodyStr = '기기와 통신에 실패하였습니다.';
                onModalOpenControl(true, headerStr, bodyStr);
            }
        }
        else {
            printLog('Unkown Action -', response.action);
        }
    }

    /**
     * @brief   Get JWT token and redirect user login page
     */
    const onAccessExternalWAS = () => {
        setShowLoadingAni(true);

        // Get os, udid(uuid)
        setTimeout(() => {
            let userLoginJson = JSON.stringify({
                action: ACTION.USER_LOGIN
            });
            sendMessage(userLoginJson);
        }, 500);
    }

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={showLoadingAni}></LoadingAnimation>
            <Modal open={isModalOpen} onCancel={onModalClose} 
                    onConfrim={onModalClose} header={modalHeader} confirm="확인">
                {modalBody}
            </Modal>

            <div className="logoWrap">
                <div className="logoImg"></div>
            </div>
            
            <div className="btnWrap">
                <Link to="/wifi">
                    <button type="button" >Wifi 설정</button>
                </Link>
                
                <button type="button" onClick={onAccessExternalWAS}>기기 관리</button>
                
                <Link to="/manageDevice">
                    <button type="button" >기기 암호 변경</button>
                </Link>
                
                <Link to="/rotate">
                    <button type="button" >기기 화면 회전</button>
                </Link>

                <Link to="/options">
                    <button type="button" >옵션</button>
                </Link>
            </div>
        </div>       
    );
}

export default DeviceRemoteMain;