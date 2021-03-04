import react from 'react';

function ChangeDevicePW () {
    return (
        <div className="rootWrap">
            <div className="titleWrap">
                <p>ELGO_REMOTE 접속 비밀번호 변경</p>
            </div>
            
            <div className="pwInputWrap">
                <input type="password" name="originPw" placeholder="현재 비밀번호를 입력해주세요."/>
                <input type="password" name="changePw" placeholder="변경할 비밀번호를 입력해주세요."/>
                <input type="password" name="confirmPw" placeholder="변경할 비밀번호를 한번 더 입력해주세요."/>
                <button>변경</button>
            </div>
        </div>
    );
}

export default ChangeDevicePW;