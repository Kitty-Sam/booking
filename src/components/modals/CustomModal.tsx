import { FC } from 'react';
import { Modal } from 'react-overlays';
import styles from '@styles/CustomModal.module.css';

export interface ICustomModal {
    open: boolean;
    children: any;
}

export const CustomModal: FC<ICustomModal> = ({ open, children }) => {
    const renderBackdrop = (props: any) => <div className={styles.backDrop} {...props} />;

    return (
        <Modal className={styles.modal} show={open} renderBackdrop={renderBackdrop}>
            <div className={styles.modalCentered}>
                <div className={styles.modalView}>{children}</div>
            </div>
        </Modal>
    );
};
