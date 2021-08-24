import modalOverlayStyles from './modalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({onClose}) {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    onClose: PropTypes.func
};