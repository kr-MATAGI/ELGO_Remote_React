import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ACTION} from '../components/definitions/commDefinition.js';
import {sendMessage, websocket} from '../utils/websocket/RemoteWebsocket.js';
import LoadingAnimation from '../animations/Loading.js';

/**
 * @brief   Main page
 */
function DeviceRemoteMain() {
    /**
     * @brief   Loading Animation
     */
    const [showLoadingAni, setShowLoadingAni] = useState(false);

    /**
     * @brief   Websocket onmessage override
     */
    const EXT_HOST = 'https://demo.elgo.co.kr/client/jwt/user'
    websocket.onmessage = (event) =>{
        setShowLoadingAni(false);
        
        let response = JSON.parse(event.data);
        console.log(response);

        if(ACTION.USER_LOGIN === response.action) {
            if(true === response.result) {
                // get token from server using axios
                let body = {
                    os: response.os,
                    uuid: response.udid // plz see a uuid, udid defintion
                }
                console.log(body);

                axios.post(EXT_HOST, body).then((axiosResponse) => {
                    console.log(axiosResponse);

                    let newToken = axiosResponse.data.newToken;
                    // link to external webserver with jwt
                    let loginPageUrl = 'https://demo.elgo.co.kr/client/login?token=';
                    loginPageUrl += newToken;
                    console.log('logingPageUrl', loginPageUrl);
                   
                    // access external web
                    window.location.assign(loginPageUrl);
                }).catch((error) => {
                    console.log(error);
                });
            }
            else {
                
            }
        }
        else {
            console.log('Unkown Action -', response.action);
        }
    }

    /**
     * @brief   Get JWT token and acess user login server
     */
    const onAccessExternalWAS = () => {
        setShowLoadingAni(true);

        // Get os, udid(uuid)
        let userLoginJson = JSON.stringify({
            action: ACTION.USER_LOGIN
        });
        sendMessage(userLoginJson);
    }

    return(
        <div className="rootWrap">
            <LoadingAnimation bIsRender={showLoadingAni}></LoadingAnimation>

            <div className="logoWrap">
                <h1>LOGO</h1>
            </div>
            
            <div className="btnWrap">
                <Link to="/wifi">
                    <button type="button" >Wifi 설정</button>
                </Link>
                
                {/** TODO : Insert jwt and access web server */}
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