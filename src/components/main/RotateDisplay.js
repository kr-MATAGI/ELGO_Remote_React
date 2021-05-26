import React, { useState } from 'react';
import { ReactComponent as DisplayImg } from '../../img/display.svg';
import LoadingAnimation from '../../animations/Loading.js';
import {sendMessage, websocket} from '../../utils/websocket/RemoteWebsocket.js';
import { ACTION } from '../definitions/commDefinition.js'

/**
 * @brief   Heading direction
 */
const DIRECTION = {
    HEAD_TOP: 1,
    HEAD_RIGHT: 2,
    HEAD_BOTTOM: 3,
    HEAD_LEFT: 4
}

const ConvertDirectionToStr = (src) => {
    let retValue;

    switch (src)
    {
        case DIRECTION.HEAD_TOP:
            retValue = "HEAD_TOP";
            break;

        case DIRECTION.HEAD_RIGHT:
            retValue = "HEAD_RIGHT";
            break;
        
        case DIRECTION.HEAD_BOTTOM:
            retValue = "HEAD_BOTTOM";
            break;

        case DIRECTION.HEAD_LEFT:
            retValue = "HEAD_LEFT";
            break;
        
        default:
            break;
    }

    return retValue;
}

/**
 * @brief   Rotate device display
 * @note    Heading is standard.
 */
function RotateDisplay () {
    /**
     * @brief   Loading Animation
     */
    const [loadingStatus, setLoadingStatus] = useState(false);
    const bRenderLoading = loadingStatus;

    /**
     * @brief   Rotate display img when clicked button
     */
    const [imgHeading, setImgHeading] = useState(DIRECTION.HEAD_TOP);
    const [rotationDegree, setRotationDegree] = useState(0);
    const onClickedRotationBtn = () => {
        setRotationDegree(rotationDegree+90);
        
        let heading = imgHeading + 1;
        if( DIRECTION.HEAD_LEFT < heading){
            heading = DIRECTION.HEAD_TOP;
        }
        setImgHeading(heading);
    }

    /**
     * @brief   Websocket onmessage override
     */
    websocket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        console.log(response);
        setLoadingStatus(false);
    }

    /**
     * @brief   Send current display rotation degree to server(elgo_control)
     */
    const onSendRotationDegree = () => {
        setLoadingStatus(true);
        setTimeout(() => {
            const sendJson = JSON.stringify({
                action: ACTION.ROTATE_DISPLAY,
                rotateDisplay:{
                    newHeading: ConvertDirectionToStr(imgHeading)
                }
            })
            sendMessage(sendJson);
        }, 500);
    }

    return (
        <div className="rootWrap">
            <LoadingAnimation bIsRender={bRenderLoading}></LoadingAnimation>
            <div className="logoWrap">
                <div className="logoImg"></div>
            </div>
            <div className="btnWrap">
                <div className="exampleIconWrap">
                    <DisplayImg style={{transform: `rotate(${rotationDegree}deg)`}}/>
                </div>
                
                <div className="buttonWrap">
                    <button onClick={onClickedRotationBtn}>회전</button>
                    <button onClick={onSendRotationDegree}>적용</button>
                </div>
            </div>
        </div>
    );
}

export default RotateDisplay;