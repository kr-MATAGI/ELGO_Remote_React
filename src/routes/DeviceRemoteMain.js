import React from 'react';
import { Link } from 'react-router-dom';

const onAccessExternalWAS = () => {
    // get token from server using axios (http)

    // link to external webserver with jwt
}


// Route url : './main'
function DeviceRemoteMain() {
    return(
        <div className="rootWrap">
            <div className="logoWrap">
                <h1>LOGO</h1>
            </div>
            
            <div className="btnWrap">
                <Link to="/">
                    <button type="button" onClick="">Wifi 설정</button>
                </Link>
                {/** TODO : Insert jwt and access web server */}
                <button type="button" onClick="onAccessExternalWAS">기기 관리</button>
                <button type="button" onClick="">설정 페이지 암호 변경</button>
                <button type="button" onClick="">기기 화면 회전</button>
                <button type="button" onClick="">옵션</button>
            </div>
        </div>       
    );
}

export default DeviceRemoteMain;