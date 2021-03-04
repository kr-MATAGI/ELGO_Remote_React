import React from 'react';
import PropTypes from 'prop-types';

const RegisterDeviceName = () => {
    return (
        <div className="rootWrap">
            <div className="titleWrap">
                <h1>기기 등록을 위해 이름을 지정해주세요.</h1>
            </div>

            <div className="registerWrap">
                <form>
                    <input type="text" name="deviceName" placeholder="기기 이름을 입력해주세요."></input>
                    <button>기기 등록</button>
                </form>
            </div>
        </div>
    );
}

const RenameDevice = () => {
    return(
        <div className="rootWrap">
            <div className="titleWrap">
                <h1>변경하고자 하는 기기 이름으로 입력해주세요.</h1>
            </div>

            <div className="registerWrap">
                <form>
                    <input type="text" name="deviceName" placeholder="기기 이름을 입력해주세요."></input>
                    <button>기기 이름 변경</button>
                </form>
            </div>
        </div>
    )
}

// Route Type, {1 : Register Device Name, 2 : Renaming Device}
function SetDeviceName (routeType) {
    return 1 === routeType ? RegisterDeviceName() : RenameDevice()
}

SetDeviceName.PropTypes = {
    routeType: PropTypes.number.isRequired
};

export default SetDeviceName;