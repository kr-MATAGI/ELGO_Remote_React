import React from 'react'
import SetDeviceName from '../components/manage/SetDeviceName';

function DeviceManage() {
    return (
        <div className="rootWrap">
            <div className="logoWrap">
                <h1>Logo</h1>
            </div>
            
            <div className="btnWrap">
                <button>기기 등록</button>
                <button>기기 이름 변경</button>
                <button>옵션</button>
            </div>
        </div>
    );
}

export default DeviceManage;