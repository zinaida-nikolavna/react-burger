import {useState, useContext, useReducer, useEffect} from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'; 
import OrderDetails from '../orderDetails/orderDetails';
import {IngredientsContext} from '../../utils/appContext.js';
import {postData} from '../../utils/src.js';

const pricenitialState = { price: 0 }; 

// функция для расчета цены заказа
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
    // стейт для расчета окончательной цены заказа
    const [state, dispatch] = useReducer(reducer, pricenitialState);
    // номер заказа для модального окна
    const [orderData, setOrder] = useState({order: {number: null}});
    // обработка ошибки
    const [isError, setIsError] = useState(false);
    // выбранные ингредиенты
    const [ingredientsData, setIngredients] = useContext(IngredientsContext);
    // стейт для булочки
    const [bun, setBun] = useState(null);
    // стейт для проверки с булочкой заказ или нет
    const [isWithoutBun, setisWithoutBun] = useState(false);

    useEffect(() => {
      const bunsIndex = []; // индекс булки в массиве ingredientsData
      const buns = []; // массив item булок
      const ingredients = [] // массив прочих ингредиентов
      ingredientsData.forEach((item, index) => {
        // проходимся по массиву, если булка, то пушим в массивы для булки
        if (item.type === 'bun') {
          bunsIndex.push(index);
          buns.push(item);
        } else {
          // если не булка, то пушим в ингредиенты
          ingredients.push(item);
        }
      });

      /* если в массиве buns булок больше, чем одна, то нужно очистить массив ingredientsData
         от старой булки и обновить стейт, также очищаем вспомогательные массивы
         и не забываем удалить цену старой булки из суммы
      */
      if (buns.length > 1) {
        ingredientsData.splice(bunsIndex[0], 1);
        dispatch({type: 'delete', payload: buns[0].price * 2});
        buns.splice(0, 1);
        bunsIndex.splice(0, 1);
        setIngredients(ingredientsData);
      }

      setBun(buns[0]); // устанавливаем булку

      /* рассчитываем цену булки
         проверяем, что последним элементом в массив пришла именно булка
         только после этого добавляем цену в сумму
      */
      if (buns.length && ingredientsData[ingredientsData.length - 1].type === 'bun') {
        dispatch({type: 'add', payload: buns[0].price * 2});
      }

      /* рассчитываем цену ингредиентов
         проверяем, что последним элементом в массив пришел именно ингредиент
         только после этого добавляем цену в сумму
      */
      if (ingredients.length && ingredientsData[ingredientsData.length - 1].type !== 'bun') {
        dispatch({type: 'add', payload: ingredients[ingredients.length - 1].price});
      }

   }, [ingredientsData]);

    // Запрос на сервер для получения номера заказа
    const getOrder = async() => {
      // если булочки нет, то запрос на сервер не отправляется
      if (bun) {
        try {
          const ingredients = ingredientsData.map((item) => {
            return item._id
          })
          const res = await postData(ingredients);
          const data = await res;
          setOrder(data);
          setisWithoutBun(false);
        }
        catch {
          setIsError(true);
        }
      } else {
        setisWithoutBun(true);
      }
      setModal(true);  
    } 

    return (
        <section className={`${burgerConstructorStyles.list} mt-25`}>
          <div className={burgerConstructorStyles.wrapper}>
            <div className={`${burgerConstructorStyles.flexEnd}`}>
                {bun && <ConstructorElement 
                    type='top' 
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image} />}
            </div>    
            <div className={`${burgerConstructorStyles.container} mt-2 mb-2`}>
                {ingredientsData.map((item) => (
                    <div key={item._id} className={burgerConstructorStyles.listItem}>
                        {item.type !== 'bun' && <DragIcon type="primary" />}
                        {item.type !== 'bun' && 
                        <ConstructorElement
                            type={undefined}
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}/>}
                    </div>                                 
                ))}
            </div>
            <div className={`${burgerConstructorStyles.flexEnd}`}>
                {bun && <ConstructorElement 
                    type='bottom' 
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image} />} 
            </div>
            </div>
            <div className={`${burgerConstructorStyles.flex} ${burgerConstructorStyles.order} mt-10 mb-13`}>
                <div className={`${burgerConstructorStyles.flex} ${burgerConstructorStyles.alignCenter} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{state.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={() => getOrder()}>
                    Оформить заказ
                </Button>
            </div>
            <Modal title='' isOpened={isOpenModal} onModalClose={() => setModal(false)}>
                <OrderDetails 
                    orderNumber={orderData.order.number} 
                    isError={isError}
                    isWithoutBun={isWithoutBun}/>
            </Modal>
        </section>
    );
}
  
export default BurgerConstructor;