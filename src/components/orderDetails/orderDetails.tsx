import orderDetailsStyles from './orderDetails.module.css';
import PropTypes from 'prop-types';

type TOrderDetails = {
    orderNumber: number;
    isError: boolean;
    isWithoutBun: boolean;
    isLoading: boolean;
}

/**
 * Компонент содержимого заказа
 * @param orderNumber- номер заказа
 * @param isError- флаг, что нужно показать ошибку при загрузке данных
 * @param isLoading- флаг, что нужно показать заглушку, что данные ещё грузятся
 * @param isWithoutBun- флаг, что нужно показать ошибку, что не выбрана булка
 */
function OrderDetails({orderNumber, isError, isWithoutBun, isLoading}: TOrderDetails): React.ReactElement {
    if (isError || isWithoutBun || isLoading) {
        return (
            <div className={`${orderDetailsStyles.order} pl-25 pr-25`}>
                <div className="text text_type_main-medium mb-15">
                {isWithoutBun ? 'Добавьте в бургер булочку' : isLoading ? 'Загрузка' : 'Что-то пошло не так... Перезагрузите страницу'}
                </div>
            </div>
        )
    } else {
        return(
            <div className={`${orderDetailsStyles.order} pl-25 pr-25`}>
                {orderNumber && <h1 className='text text_type_digits-large mb-8'>{orderNumber}</h1>}
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img src='/images/graphics.png' alt='123' className='mb-15' />
                <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
                <p className={`${orderDetailsStyles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        )
    }
}

export default OrderDetails;

OrderDetails.propTypes = {
    orderNumber: PropTypes.number,
    isError: PropTypes.bool,
    isWithoutBun: PropTypes.bool,
    isLoading: PropTypes.bool
};