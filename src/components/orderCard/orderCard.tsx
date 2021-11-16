import style from './orderCard.module.css';
import { getDateTime } from '../../utils/utils';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {TOrder, TIngredientWithKey} from '../../utils/types';
import { Link, useLocation } from "react-router-dom";
import {Location} from 'history';
import { v4 as uuidv4 } from 'uuid';

type TOrderCardProps = {
    orderData: TOrder,
    key: number
}


/**
 * Карточка заказа в реестре
 * @param orderData - данные о заказе
 */
function OrderCard({orderData}: TOrderCardProps): React.ReactElement {
    let location = useLocation<Location>();
    const burgerData = useSelector(state => state.burger.items);
    const orderIngredients: TIngredientWithKey[] = [];

    // получаем данные об ингредиентах
    for (let orderIngredient of orderData.ingredients) {
        burgerData.forEach((item) => {
            if (item._id === orderIngredient) {
                orderIngredients.push({...item, key: uuidv4()});
            }
        })
    }
    
    // высчитываем стоимость
    const price = orderIngredients.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price;
    }, 0);
    
    if (!orderData) {
        return(
            <></>
        );
    }
    
    return(
        <Link className={style.link}
              to={{
              pathname: `${location.pathname}/${orderData._id}`,
              state: { background: location },
              }}>
        <div className={`${style.container} pt-6 pr-6 pl-6 pb-6 mt-4 mr-2`}>
            <div className={style.first_line}>
                <p className="text text_type_digits-default">#{orderData.number}</p>
                <p className="text text_type_main-default text_color_inactive">{getDateTime(orderData.createdAt)}</p>
            </div>
            <div title={orderData.name} className={`${style.name} text text_type_main-medium pt-6`}>{orderData.name}</div>
            <div className={`${style.first_line} pt-6`}>
                <div className={style.flexbox}>
                    {orderIngredients.map((item, index) => (
                        <div key={item.key} className={style.ingredient} 
                             style={{
                                 position: 'relative',
                                 backgroundImage: `url(${item.image_mobile})`, 
                                 backgroundRepeat: 'no-repeat', 
                                 backgroundColor: '#131316',
                                 backgroundPosition: '50% 50%',
                                 right: index * 10 + "px",
                                 zIndex: 100 - index
                             }}>
                        </div>                                     
                    ))}
                </div>
                <div className={style.flexbox}>
                    <div className="text text_type_digits-default mr-2">{price}</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        </Link>
    )
}

export default OrderCard;