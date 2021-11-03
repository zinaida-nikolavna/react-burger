import modalOverlayStyles from './modalOverlay.module.css';
import {TModalProps} from '../modal/modal';

type TModalOverlay = Pick<TModalProps, 'onModalClose'>;

/**
 * Оверлей для модального окна
 * @param onModalClose - функция закрытия модального окна 
 */
function ModalOverlay({onModalClose}: TModalOverlay): React.ReactElement {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onModalClose}></div>
    )
}

export default ModalOverlay;
