import { FC } from 'react';
import { Modal } from 'react-overlays';
import styles from '@styles/CustomModal.module.css';
import { ICustomModalProps } from '@components/modals/interfaces';

export const CustomModal: FC<ICustomModalProps> = ({ open, children }) => {
    const renderBackdrop = (props: any) => <div className={styles.backDrop} {...props} />;

    return (
        <Modal className={styles.modal} show={open} renderBackdrop={renderBackdrop}>
            <div className={styles.modalCentered}>
                <div className={styles.modalView}>{children}</div>
            </div>
        </Modal>
    );
};
