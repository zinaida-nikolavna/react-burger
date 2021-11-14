import {useState, useEffect } from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'; 
import OrderDetails from '../orderDetails/orderDetails';
import { getNumberOrder } from '../../services/middleware/burger';
import { useSelector, useDispatch } from 'react-redux';
import { DropTargetMonitor, useDrop } from "react-dnd";
import { 
  getburgerIngredients, 
  increaseCounter, 
  deleteBurgerIngredient, 
  decreaseCounter,
  decreasePrice } from '../../services/store/burger';
import BurgerIngredient from '../burgerIngredient/burgerIngredient';
import { getCookie } from '../../utils/utils';
import { TIngredient, TIngredients } from '../../utils/types';  
import { useHistory } from "react-router-dom";

type TItem = {
  id: string;
  type: string;
}

type TIngredientWithKey = TIngredient & {
  key: string;
}

/**
 * Реестр конструктора бургера
 */
function BurgerConstructor(): React.ReactElement {
    // стейт для открытия модального окна
    const [isOpenModal, setModal] = useState<boolean>(false);
    // стейт для булочки
    const [bun, setBun] = useState<TIngredient>();
    // стейт для проверки с булочкой заказ или нет
    const [isWithoutBun, setisWithoutBun] = useState<boolean>(false);
    // получаем итемы в конструкторе
    const ingredientsData: TIngredientWithKey[] = useSelector((state: any) => state.burger.burgerIngredients);

    const dispatch = useDispatch();
    const { orderNumber, orderNumberFailed, orderNumberRequest, price } = useSelector((state: any) => state.burger);
    const history = useHistory();
    // завершение перемещения по dnd
    const [{ isHover }, dropRef] = useDrop({
      accept: 'ingredient',
      collect: (monitor: DropTargetMonitor) => ({
        isHover: monitor.isOver(),
      }),
      drop(item: TItem) {
        // меняем количество итемов в конструкторе
        dispatch(getburgerIngredients(item.id));
        // меняем счетчик
        dispatch(increaseCounter({id: item.id, type: item.type}));
      },
    });

    const border = isHover ? '2px solid lightgreen' : '0px';

    useEffect(() => {
      const bunsIndex: number[] = []; // индекс булки в массиве ingredientsData
      const buns: TIngredient[] = []; // массив item булок
      ingredientsData.forEach((item: TIngredient, index: number) => {
        // проходимся по массиву, если булка, то пушим в массивы для булки
        if (item.type === 'bun') {
          bunsIndex.push(index);
          buns.push(item);
        }
      });

      /* если в массиве buns булок больше, чем одна, то нужно очистить массив ingredientsData
         от старой булки и обновить стейт, также очищаем вспомогательные массивы
         и не забываем удалить цену старой булки из суммы
      */
      if (buns.length > 1) {
        deleteIngredient(buns[0], bunsIndex[0], true);
        buns.splice(0, 1);
        bunsIndex.splice(0, 1);
      }

      setBun(buns[0]); // устанавливаем булку

   }, [ingredientsData]);

    // Запрос на сервер для получения номера заказа
    const getOrder = (): void => {
      if (getCookie('refreshToken')) {
        // если булочки нет, то запрос на сервер не отправляется
        if (bun) {
          const ingredients = ingredientsData.map((item: TIngredient) => {
            return item._id
          });
          setisWithoutBun(false);
          dispatch(getNumberOrder(ingredients as unknown as TIngredients[]));
        } else {
          setisWithoutBun(true);
        }
        setModal(true);
      } else {
        // если пользователь не авторизован то редиректим на login
        history.push('/login');
      }  
    } 

    // удаление ингредиента
    const deleteIngredient = (item: TIngredient, index: number, isBun: boolean = false): void => {

      dispatch(deleteBurgerIngredient(index));
      dispatch(decreaseCounter({id: item._id, type: item.type}));
      dispatch(decreasePrice(isBun ? item.price * 2 : item.price));
    };

    return (
        <section  ref={dropRef} style={{border}} className={`${burgerConstructorStyles.list} mt-25`}>
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
            {ingredientsData.map((item, index) => (
              <BurgerIngredient key={item.key} id={item.key} ingredient={item} index={index} deleteIngredient={deleteIngredient} />
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
                    <p className="text text_type_digits-medium mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={() => getOrder()}>
                    Оформить заказ
                </Button>
            </div>
            {!!orderNumber && <Modal title='' isOpened={isOpenModal} onModalClose={() => setModal(false)}>
                <OrderDetails 
                    orderNumber={orderNumber} 
                    isError={orderNumberFailed}
                    isLoading={orderNumberRequest}
                    isWithoutBun={isWithoutBun}/>
            </Modal>}
        </section>
    );
}
  
export default BurgerConstructor;