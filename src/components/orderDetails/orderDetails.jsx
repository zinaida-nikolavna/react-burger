import orderDetailsStyles from './orderDetails.module.css';

function OrderDetails() {
    return(
        <div className={`${orderDetailsStyles.order} pl-25 pr-25`}>
            <h1 className='text text_type_digits-large mb-8'>034536</h1>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <img src='/images/graphics.png' alt='123' className='mb-15' />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;