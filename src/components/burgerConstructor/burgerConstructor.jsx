import {useState, useContext, useReducer, useEffect} from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'; 
import OrderDetails from '../orderDetails/orderDetails';
import {AppContext} from '../../utils/appContext.js';

const pricenitialState = { price: 0 }; 

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { price: state.price + action.payload };
    case "delete":
      return {price: state.price - action.payload};
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
    // стейт для открытия модального окна
    const [isOpenModal, setModal] = useState(false);
    const [state, dispatch] = useReducer(reducer, pricenitialState);
    // достаем данные по бургерам
    const burgerData = useContext(AppContext);
    const burgerConstructorHeight = window.innerHeight - 500;
    /* TODO:скорее всего пользователю будет запрещено выбирать больше одной булки
    и в дальнейшем этот код не понадобится
    находим первый в массиве элемент с типом булка */
    const bun = burgerData.find(item => {
        return item.type === 'bun';
    })

    useEffect(() => {
        // TODO:смотри первое туду. Пока посчитаем стоимость булочки отдельно
        dispatch({type: 'add', payload: bun.price * 2});
        burgerData.forEach(item => {
            if (item.type !== 'bun') {
               dispatch({type: 'add', payload: item.price});
            }
        })
    }, [burgerData, bun.price]);

    return (
        <section className={`${burgerConstructorStyles.list} mt-25`}>
            <div className={`${burgerConstructorStyles.flexEnd} pr-4`}>
                <ConstructorElement 
                    type='top' 
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image} />
            </div>    
            <div style={{ height: burgerConstructorHeight }} className={`${burgerConstructorStyles.container} pr-2 mt-2 mb-2`}>
                {burgerData.map((item) => (
                    <div key={item._id} className={burgerConstructorStyles.listItem}>
                        {item.type !== 'bun' && <DragIcon type="primary" />}
                        {item.type !== 'bun' && 
                        <ConstructorElement
                            type={undefined}
                            isLocked={true}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}/>}
                    </div>                                 
                ))}
            </div>
            <div className={`${burgerConstructorStyles.flexEnd} pr-4`}>
                <ConstructorElement 
                    type='bottom' 
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image} /> 
            </div>
            <div className={`${burgerConstructorStyles.flex} ${burgerConstructorStyles.order} mt-10 mb-13`}>
                <div className={`${burgerConstructorStyles.flex} ${burgerConstructorStyles.alignCenter} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{state.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={() => setModal(true)}>
                    Оформить заказ
                </Button>
            </div>
            <Modal title='' isOpened={isOpenModal} onModalClose={() => setModal(false)}>
                <OrderDetails />
            </Modal>
        </section>
    );
  }
  
  export default BurgerConstructor;