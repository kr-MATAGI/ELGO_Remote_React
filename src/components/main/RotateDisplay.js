import React from 'react';

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
                {/* tabe */}
            </div>
            
            <div className="explainWrap">
                <p>현재 보이는 방향을 선택하세요.</p>
                <button>적용</button>
            </div>
        </div>
    );
}

export default RotateDisplay;