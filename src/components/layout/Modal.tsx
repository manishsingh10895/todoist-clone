import React, { useEffect, useState } from 'react';
import { FaWindowClose, FaCross } from 'react-icons/fa';

import './Layout.scss';

export type ModalAction = {
    onClick: () => void,
    title: string,
    closeOnClick?: boolean,
    type: 'positive' | 'negative' | 'neutral'
}

type Props = {
    onClose: () => void,
    show: boolean,
    title: string,
    description: string,
    actions: ModalAction[]
}

/**
 * This extra FC is created so that the useEffect could be called
 * as returning empty fragment in Modal didn't ensured component removal
 * @param props 
 */
const _Modal = (props) => {

    let _ref: any = React.createRef();

    useEffect(() => {
        return () => {
            removeClickHandler();
        };
    }, [])

    function handleDocumentClick() {
        console.log(_ref);
        document.addEventListener('click', listener);
    }

    function listener(e) {
        console.log(_ref);
        console.log(e.target);
        if (!_ref?.contains(e.target)) {
            props.onClose();
            console.log("Remove handler")
            removeClickHandler()
        }
    }

    function removeClickHandler() {
        document.removeEventListener('click', listener);
    }


    const handleClick = (action: ModalAction) => {
        action.onClick();
        if (action.closeOnClick) {
            removeClickHandler();
            props.onClose();
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal" ref={(ref) => {
                if (!ref) return;
                _ref = ref;
                Promise.resolve().then(() => handleDocumentClick())
            }}>
                <div className="modal__content">
                    <div className="modal__content__title-container">
                        <div className="modal__content__title">{props.title}</div>
                    </div>
                    <div className="close" onClick={() => props.onClose()}>
                        <FaWindowClose fontSize={24} />
                    </div>

                    <p className="modal__content__description">
                        {props.description}
                    </p>

                    <div className="modal__content__actions">
                        {
                            props.actions ?
                                props.actions.map(a => {
                                    return (
                                        <div key={a.title} className={`action ${a.type}`} onClick={() => handleClick(a)}>
                                            {a.title}
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export const Modal = (props: Props) => {
    if (props.show) {
        return <_Modal {...props} />
    }
    else return <></>
}