import { useSelector, useDispatch } from '../../services/hooks';
import {useEffect } from 'react';
import {connect, disconnect} from '../../services/store/orderList/actions';
import OrderCard from '../orderCard/orderCard';
import style from './userOrdersList.module.css';
import { getCookie } from '../../utils/utils';

function UserOrdersList(): React.ReactElement {
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${getCookie('token')}`));
      return () => {
        dispatch(disconnect());
      }
    }, [dispatch]);

    const dataOrders = useSelector(state => state.orderList.orders);

    if (!dataOrders?.orders.length) {
        return(
            <div className='text text_type_main-medium'>
                У вас ещё нет заказов
            </div>
        );
    }

    return (
        <div className={style.container}>
            {dataOrders?.orders.map((item, index) => (
                <OrderCard key={index} orderData={item} />                                     
            ))}
        </div>
)
}

export default UserOrdersList;