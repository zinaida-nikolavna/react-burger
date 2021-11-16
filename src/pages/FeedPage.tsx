import {useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import styleOrder from './FeedPage.module.css';
import OrderCard from '../components/orderCard/orderCard';
import {connect, disconnect} from '../services/store/orderList/actions';
import {TOrder} from '../utils/types';

/**
 * Лента заказов
 */
function FeedPage(): React.ReactElement {
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
      return () => {
        dispatch(disconnect());
      }
    }, [dispatch]);

    const dataOrders = useSelector(state => state.orderList.orders);

    const dataOrdersDone: number[] = [];
    const dataOrdersInWork: number[] = [];

    if (dataOrders) {
        dataOrders.orders.forEach((item: TOrder) => {
            if (item.status === 'done') {
                dataOrdersDone.push(item.number);
            } else {
            dataOrdersInWork.push(item.number);
            }
        });
    }

    const styles = {
        height: window.innerHeight,
        overflow: 'hidden'
    };
  
    return(
        <div style={styles}>
            <div className={styleOrder.main}>
                <div>
                    <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
                    {dataOrders && 
                    <div className={styleOrder.container}>
                        {dataOrders.orders.map((item, index) => (
                            <OrderCard key={index} orderData={item} />                                     
                        ))}
                    </div>}
                </div>
                <div className='mt-25 ml-15'>
                    <div className={styleOrder.flexbox}>
                    <div>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={styleOrder.columns}>
                            {dataOrdersDone.map((item, index) => (
                                <div className={`${styleOrder.succcess} text text_type_digits-default mr-2`} key={index}>{item}</div>                                     
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mb-6">В работе:</p>
                        <div className={styleOrder.columns}>
                            {dataOrdersInWork.map((item, index) => (
                                <div className="text text_type_digits-default mr-2" key={index}>{item}</div>                                     
                            ))}
                        </div>
                    </div>
                    </div>
                    <div className="text text_type_main-medium mt-15">Выполнено за все время:</div>
                    {dataOrders && 
                    <div className="text text_type_digits-large">{dataOrders.total}</div>}
                    <div className="text text_type_main-medium mt-15">Выполнено за сегодня:</div>
                    {dataOrders && 
                    <div className="text text_type_digits-large">{dataOrders.totalToday}</div>}
                </div>
            </div>
        </div>
    )
}


export default FeedPage;