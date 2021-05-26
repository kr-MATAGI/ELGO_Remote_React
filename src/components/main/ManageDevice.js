import React, {useState} from 'react';
import LoadingAnimation from '../../animations/Loading.js'
import { Modal } from '../../utils/dialog/Modal.js';
import { sendMessage, websocket } from '../../utils/websocket/RemoteWebsocket.js';
import { ACTION } from '../definitions/commDefinition.js';
import { useHistory } from 'react-router-dom';
import '../../css/ManageDevice.css';

/**
 * @brief   Change Device Password
 * @note    default id : root, pw : root
 */
function ChangeDevicePW () {
    /**
     * @brief   Animation
     */
    const [loadingStatus, setLoadingStatus] = useState(false);
    const bRenderLoading = loadingStatus;

    /**
     * @brief   Dialog (Modal)
     */
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState({
        status: false,
        body: ''
    });
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
        if(true === modalStatus[0])
        {
            history.push('/main');
        }
        else
        {
            setInputs('','','');
        }
    }
    const cancelModal = () => {
        setModalOpen(false);
        setInputs('','','');
    }

    /**
     * @brief   Websocket onmessage override
     */
    websocket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        console.log(response);

        if(ACTION.MANAGE_DEVICE === response.action)
        {
            setLoadingStatus(false);
            if(true === response.result) {
                setModalStatus([true, "비밀번호가 성공적으로 변경되었습니다."]);
                openModal();
            }
            else{
                setModalStatus([false, "비밀번호를 다시 입력해주세요"]);
                openModal();
            }
        }
    }

    /**
     * @brief   Old & new device password state
     */
    const [inputs, setInputs] = useState({
        originPw: '',
        newPw: '',
        confirmPw: '',
    })
    const { originPw, newPw, confirmPw } = inputs;
    const onValueChange = (element) => {
        const { value, name } = element.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    /**
     * @brief   Verify and change device password
     */
    const changeDevicePassword = () =>{
        setLoadingStatus(true);

        setTimeout(() => {
            if('' === originPw || '' === newPw || '' === confirmPw) {
                setLoadingStatus(false);
                setModalStatus([false, "비밀번호를 입력해주세요"]);
                openModal();
            }
            else if(newPw !== confirmPw) {
                setLoadingStatus(false);
                setModalStatus([false,"변경하고자하는 비밀번호가 서로 일치하지 않습니다."]);
                openModal();
            }
            else {
                let requestChangePw = JSON.stringify({
                    action: ACTION.MANAGE_DEVICE,
                    manageDevice: {
                        oldPassword: originPw,
                        newPassword: newPw
                    }
                });
                sendMessage(requestChangePw);
            }            
        }, 500);
    }

    return (
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <Modal open={modalOpen} cancel={cancelModal} close={closeModal} header="비밀번호 변경" confirm="확인">
                {modalStatus[1]}
            </Modal>

            <div className="logoWrap">
                <div className="logoImg"></div>
            </div>

            <div className="pwInputWrap">
                <p>ELGO_REMOTE 접속 비밀번호 변경</p>

                <div className="pwInpWrap">
                    <div className="pwInpImgWrap">
                        <div className="pwInpImg"></div>
                    </div>
                    <div className="pwInp">
                        <input type="password" name="originPw" 
                            value={originPw || ''}
                            onChange={onValueChange}
                            placeholder="현재 비밀번호"/>

                        <input type="password" name="newPw" 
                            value={newPw || ''}
                            onChange={onValueChange}
                            placeholder="새 비밀번호"/>

                        <input type="password" name="confirmPw" 
                            value={confirmPw || ''}
                            onChange={onValueChange}
                            placeholder="비밀번호 확인"/>
                    </div>
                </div>

                <button onClick={changeDevicePassword}>변경</button>
            </div>
        </div>
    );
}

export default ChangeDevicePW;