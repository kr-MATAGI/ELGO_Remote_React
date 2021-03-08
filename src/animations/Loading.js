import React from 'react';
import classNames from 'classnames';
import './Loading.css';

function LoadingAnimation(props) {
    if(false === props.bIsRender) {
        return null;
    }     
    else{
        return(
            <div className="loadingWrap">
                <div className={classNames('loading', 'load_1')}></div>
                <div className={classNames('loading', 'load_2')}></div>
                <div className={classNames('loading', 'load_3')}></div>
            </div>
        )
    }
}

export default LoadingAnimation;