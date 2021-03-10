import React from 'react';
import { ReactComponent as DisplayImg } from '../../img/display.svg';

/**
 * @brief   Heading direction
 */
const DIRECTION = {
    HEAD_TOP: 1,
    HEAD_BOTTOM: 2,
    HEAD_LEFT: 3,
    HEAD_RIGHT: 4
}

/**
 * @brief   Rotate device display
 * @note    Heading is standard.
 */
function RotateDisplay () {
    return (
        <div className="rootWrap">
            <div className="exampleIconWrap">
                <DisplayImg/>

            </div>
            
            <div className="buttonWrap">
                <button>적용</button>
            </div>
        </div>
    );
}

export default RotateDisplay;