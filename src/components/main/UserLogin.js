import react from 'react';

function UserLogin () {
    return(
        <div className="rootWrap">
            <div className="loginWrap">
                <input type="text" name="userId" placeholder="아이디를 입력해주세요."/>
                <input type="password" name="userPw" pattern="비밀번호를 입력해주세요."/>
                <button>로그인</button>
            </div>
        </div>
    );
}

export default UserLogin;