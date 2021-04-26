import React, { useState, useEffect } from 'react';
import '../../css/Modal.css';

/**
 * @note
 *          true === isInput, show <input type/>
 *          Use external method - Set/GetModalInputValue
 */
var extInputValue = '';
export function Modal ( props ) {
    // props
    const { open, cancel, close, header, confirm, hideBtn, isInput, inputType, placeholderStr } = props;
    
    // useState
    const [isOpen, setIsOpen] = useState(open);
    const [inputStr, setInputStr] = useState('');
    const onInputChange = (element) =>{
        const value = element.target.value;
        setInputStr(value);
        extInputValue = value;
    }

    /**
     * @brief   For external method
     */
     const updateInputValue = () => {
        setInputStr(extInputValue);
    }
    useEffect(() => {
        updateInputValue();
    }, [extInputValue]);

    return (
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                    </header>
                    <main>
                        {props.children}
                        { 
                            (function() {
                                if(true === isInput) {
                                    return (<p><input type={inputType} className="modalInput"
                                                    placeholder={placeholderStr}
                                                    value={inputStr || ''} onChange={onInputChange}/></p>)
                                }
                            })()
                        }
                    </main>
                    <footer>
                        { hideBtn ? null : <button className="cancel" onClick={cancel}>취소</button>}
                        {" "}
                        { hideBtn ? null : <button className="close" onClick={close}>{confirm}</button>}
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

/**
 * @brief   External Method
 */
export const getModalInputValue = () => {
    return extInputValue;
}
export const setModalInputValue = (value) => {
    extInputValue = value;
}