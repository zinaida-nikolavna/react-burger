import {useContext, useEffect, useState} from 'react';
import orderDetailsStyles from './orderDetails.module.css';
import {AppContext} from '../../utils/appContext.js';

const POST_ENDPOINT = 'https://norma.nomoreparties.space/api/orders';

function OrderDetails() {
    const [orderData, setOrder] = useState({order: {number: null}});
    const [isError, setIsError] = useState(false);
    const burgerData = useContext(AppContext);
    useEffect(() => {
        const ingredients = burgerData.map((item) => {
            return item._id
        })
        const postOrder = () => {
          fetch(POST_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ingredients
              })
            })
            .then(res => {
              if (res.ok) {
                return res.json();
              } else {
                return Promise.reject(`Ошибка ${res.status}`);
              }
            })
            .then(data => setOrder(data))
            .catch(() => {
              setIsError(true);
            });
        }
        postOrder();
      }, [burgerData]);
      
    if (isError) {
        return (
            <div className={`${orderDetailsStyles.order} pl-25 pr-25`}>
                <div className="text text_type_main-medium mb-15">
                Что-то пошло не так... Перезагрузите страницу
                </div>
            </div>
        )
    } else {
        return(
            <div className={`${orderDetailsStyles.order} pl-25 pr-25`}>
                {orderData.order.number && <h1 className='text text_type_digits-large mb-8'>{orderData.order.number}</h1>}
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img src='/images/graphics.png' alt='123' className='mb-15' />
                <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
                <p className={`${orderDetailsStyles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        )
    }
}

export default OrderDetails;