import ReactDOM from 'react-dom';
import {useEffect, useCallback} from 'react';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay';
import { CloseIcon }  from '@ya.praktikum/react-developer-burger-ui-components';

export type TModalProps = {
    onModalClose: () => void;
    title?: string;
    isOpened: boolean;
    children: React.ReactElement;
}

type keyDownCallback = (e: KeyboardEvent) => void;

/**
 * Компонент модального окна
 * @param onModalClose - функция закрытия модального окна
 * @param title - заголовок модального окна
 * @param isOpened - флаг, открыто ли окно
 * @param children - содержимое модального окна (компонент)
 */
function Modal({onModalClose, title, isOpened, children}: TModalProps): React.ReactElement {

    // закрываем модальное окно по Escape
    const keyDown = useCallback<keyDownCallback>(
        e => {
            if (e.key === 'Escape') {
                onModalClose();
            }
            return;
        },
        [onModalClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', keyDown);
        return () => document.removeEventListener('keydown', keyDown);
    }, [keyDown]);

    if (!isOpened) { 
        return <></>;
    };

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onModalClose={onModalClose}/>
                <div className={`${modalStyles.modal} pl-10 pr-10 pb-10 pt-10`}>
                    <div className={modalStyles.header}>
                        <h3 className='text text_type_main-large'>{title}</h3>
                        <div data-qa='close-icon' onClick={onModalClose} >
                            <CloseIcon type="primary" />
                        </div>
                    </div>
                    {children}
                </div>
            </>
        ),
        document.getElementById('modal') as HTMLElement
    )
}

export default Modal;