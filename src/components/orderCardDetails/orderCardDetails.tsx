import { useSelector, useDispatch } from '../../services/hooks';
import style from './orderCardDetails.module.css';
import { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getDateTime } from '../../utils/utils';
import {TOrder, TIngredientWithKey} from '../../utils/types';
import { useParams } from 'react-router-dom';
import {connect, disconnect} from '../../services/actions/orderList';
import { v4 as uuidv4 } from 'uuid';

type TOrderCardDetailsProps = {
    isModal?: boolean;
}

/**
 * Детальная карточка ингредиента
 * 
 */
function OrderCardDetails({isModal}: TOrderCardDetailsProps): React.ReactElement {
    const dispatch = useDispatch();

    const dataOrders = useSelector(state => state.orderList.orders);
    const burgerData = useSelector(state => state.burger.items);
    const { id } = useParams<{id: string}>();

    useEffect(()=> {
        if (!dataOrders) {
            dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
            return () => {
                dispatch(disconnect());
            }
        }
    }, [dispatch]);

    // получаем заказ по id
    const order: TOrder | undefined = dataOrders ? dataOrders.orders.find((item: TOrder) => item._id === id) : undefined;
        
    // получаем массив ингредиентов
    const orderIngredients: TIngredientWithKey[] = [];
    if (order) {
        for (let orderIngredient of order.ingredients) {
            burgerData.forEach((item) => {
                if (item._id === orderIngredient) {
                    orderIngredients.push({...item, key: uuidv4()});
                }
            })
        }
    }

    // высчитываем стоимость
    let price;
    if (orderIngredients) {
        price = orderIngredients.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price;
        }, 0);
    }

    if (!orderIngredients || !order) {
        return <></>;
    }

    return(
        <div className={isModal ? '' : style.page}>
        <div className={style.container}>
            <p className={`${style.order_number} text text_type_digits-default`}>{`#${order.number}`}</p>
            <h3 className='text text_type_main-medium mb-3 mt-10'>{order.name}</h3>
            <p className={order.status === 'done' ? `${style.success} text text_type_main-small` : 'text text_type_main-small'}>
                {order.status === 'done' ? 'Выполнен' : 'В работе'}
            </p>
            <p className='text text_type_main-medium mt-15'>Состав:</p>
            <div className={`${style.ingredient} mt-4`}>
            {orderIngredients.map((item) => (
                   <div key={item.key} className={`${style.item} mt-4 mr-4`} >
                       <div className={style.flexbox}> 
                            <div className={style.border}>
                                <div style={{
                                    position: 'relative',
                                    backgroundImage: `url(${item.image_mobile})`, 
                                    backgroundRepeat: 'no-repeat', 
                                    backgroundPosition: '50% 50%',
                                    width: '64px',
                                    height: '64px'
                                    }}>
                                </div>
                            </div>
                            <p className="text text_type_main-default ml-4">{item.name}</p> 
                        </div>
                        <div className={style.flexbox}>
                            <p className='mr-2 text text_type_digits-default'>{item.type === 'bun' ? '2' : '1'}&times;{item.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                   </div>                                      
                ))}
                </div>
                <div className={`${style.item} mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">{getDateTime(order.createdAt)}</p>
                    <div className={`${style.flexbox} mr-4`}>
                        <p className="text text_type_digits-default mr-2">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
        </div>
        </div>
    )
}

export default OrderCardDetails;