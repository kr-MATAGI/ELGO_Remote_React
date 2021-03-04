import React from 'react';
import { Link } from 'react-router-dom';


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
                <button type="button" onClick="">기기 관리</button>
                {/* checking naming*/}
                <button type="button" onClick="">설정 페이지 암호 변경</button>
                <button type="button" onClick="">기기 화면 회전</button>
                <button type="button" onClick="">기타</button>
            </div>
        </div>       
    );
}

export default DeviceRemoteMain;