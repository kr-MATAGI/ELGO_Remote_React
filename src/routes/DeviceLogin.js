import React from 'react';


// TODO : 

function DeviceLogin() {
    return (
        <div className="deviceLogin">
            <h2>ELGO SYSTEM</h2>  
            <form>
                <label>
                    <input type="text" name="deviceId" placeholder="아이디를 입력하세요" />
                </label>
                <label>
                    <input type="password" name="devicePw" placeholder="비밀번호를 입력하세요" />
                </label>
                <button >로그인</button>
            </form>
        </div>
    );
}

export default DeviceLogin;