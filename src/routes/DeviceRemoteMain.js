import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

/**
 * @brief   Get JWT token and acess user login server
 */
const EX_HOST = 'https://demo.elgo.co.kr'
const onAccessExternalWAS = () => {
    // get uuid
    const uuid = uuidv4();
    console.log(uuid);
    // get os

    // get token from server using axios (http)

    // link to external webserver with jwt
}


/**
 * @brief   Main page
 */
function DeviceRemoteMain() {
    return(
        <div className="rootWrap">
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