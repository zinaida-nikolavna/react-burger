import orderDetailsStyles from './orderDetails.module.css';

function OrderDetails({orderNumber, isError, isWithoutBun}) {
    if (isError || isWithoutBun) {
        return (
            <div className={`${orderDetailsStyles.order} pl-25 pr-25`}>
                <div className="text text_type_main-medium mb-15">
                {isWithoutBun ? 'Добавьте в бургер булочку' : 'Что-то пошло не так... Перезагрузите страницу'}
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