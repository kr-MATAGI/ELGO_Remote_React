import React, { useState } from 'react';
import {sendMessage, websocket} from '../utils/websocket/RemoteWebsocket.js';
import {actionDefine} from '../utils/websocket/definitions/WebsocketDef.js';
import LoadingAnimation from '../animations/Loading.js';
import { useHistory } from 'react-router-dom';
import { Modal } from '../utils/dialog/Modal.js';

export default function DeviceLogin() {
    /**
     * @brief   Loading Animation
     */
    const [loadingStatus, setLoadingStatus] = useState(false);
    const bRenderLoading = loadingStatus;

    /**
     * @brief   Dialog (Modal)
     */
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStr, setModalStr] = useState('');
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
        setInputs(['','']);
    }
    
    /**
     * @brief   override websocket onmessage
     */
    const history = useHistory();
    websocket.onmessage = (event) => {
        const recvJson = JSON.parse(event.data);
        console.log("recvJson : ", recvJson)
        
        setLoadingStatus(false);
        if( true === recvJson.result )
        {
            history.push('/main');
        }
        else
        {
            setModalStr('아이디 혹은 비밀번호를 확인해 주세요.');
            openModal();
        }
    }

    /**
     * @brief   device id & pw
     */
    const [inputs, setInputs] = useState({
        deviceId: '',
        deviecPw: ''
    });
    const { deviceId, devicePw } = inputs;

    const onValueChange = (element) =>{
        const { value, name } = element.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    /**
     * @brief   Confirm button action
     */
    const deviceLoginVerify = () => {
        console.log('deviceLoginVerify');

        if('' === deviceId || '' === devicePw) {
            setModalStr('아이디 혹은 비밀번호를 입력해주세요.');
            openModal();
        }       
        else{
            setLoadingStatus(true);
            // loading anmation 
            setTimeout(() => {
                const deviceLoginJson = {
                    action: actionDefine.DEVICE_LOGIN,
                        deviceLogin: {
                            id: deviceId,
                            pw: devicePw
                        }
                    }
                sendMessage(JSON.stringify(deviceLoginJson));
            }, 500);            
        }
    }

    return (
        <div className="deviceLogin">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <Modal open={modalOpen} close={closeModal} header="로그인" confirm="확인">
                {modalStr}
            </Modal>

            <h2>ELGO SYSTEM</h2>
                <input type="text" name="deviceId" placeholder="아이디를 입력하세요" value={deviceId || ''} onChange={onValueChange} />
                <input type="password" name="devicePw" placeholder="비밀번호를 입력하세요" value={devicePw|| ''} onChange={onValueChange} />                    
            <button onClick={deviceLoginVerify}>로그인</button>
        </div>
    );
}