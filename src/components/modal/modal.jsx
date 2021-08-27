import ReactDOM from 'react-dom';
import {useEffect, useCallback} from 'react';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay';
import { CloseIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Modal({onModalClose, title, isOpened, children}) {

    // закрываем модальное окно по Escape
    const keyDown = useCallback (
        e => {
            if (e.key === 'Escape') {
                onModalClose()
            }
        },
        [onModalClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', keyDown);
        return () => document.removeEventListener('keydown', keyDown);
    }, [keyDown]);

    if (!isOpened) { 
        return null;
    };

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onModalClose}/>
                <div className={`${modalStyles.modal} pl-10 pr-10 pb-10 pt-10`}>
                    <div className={modalStyles.header}>
                        <h3 className='text text_type_main-large'>{title}</h3>
                        <CloseIcon type="primary" onClick={onModalClose} />
                    </div>
                    {children}
                </div>
            </>
        ),
        document.getElementById('modal')
    )
}

export default Modal;

Modal.propTypes = {
    onModalClose: PropTypes.func,
    title: PropTypes.string,
    isOpened: PropTypes.bool,
    children: PropTypes.element
};