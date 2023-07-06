import React from "react";
import styles from '../../styles/Styles.module.css'

export interface ModalParams {
    show?: boolean;
    children?: React.ReactNode;
    onClose?: () => any
}

export default function Modal(params: ModalParams) {
    const { show, children, onClose = () => null } = params;
    if(!show) return (<></>)
    return (
        <div onClick={onClose} className={styles.modal}>
            <div>
                <span className={styles.closeModal}>
                    <button onClick={onClose}>&times;</button>
                </span>
                <div className={styles.modalCard}>{children}</div>
            </div>
        </div>
    )
}