import cartBurgerStyles from './cartBurger.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { showIngredient } from '../../services/store/burger';
import { useDrag } from "react-dnd";
import { TIngredient } from '../../utils/types';

type TCartBurgerProps = {
    data: TIngredient;
}

/**
 * Компонент записи(ингредиент) в реестре ингредиентов
 * @param data - данные ингредиента
 * @returns 
 */
function CartBurger({data}: TCartBurgerProps): React.ReactElement {
    const counter = useSelector((state: any) => state.burger.counter);
    const dispatch = useDispatch();
    const id = data._id;
    const type = data.type;
    const [{isDragging}, dragRef] = useDrag({
        type: 'ingredient',
        item: {id, type},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const openedIngredient = (): void => {
        dispatch(showIngredient(data));
        window.history.pushState({}, '', `http://localhost:3000/ingredients/${id}`);
    }

        return (
            <>
                <div ref={dragRef} style={{ border: isDragging ? '2px solid lightgreen' : '0px'}} className={`${cartBurgerStyles.cart} mb-8`} onClick={() => openedIngredient()}>
                    {!!counter[id] && <Counter count={counter[id]} size='default' />}
                    <img src={data.image} alt='изображение ингредиента'/>
                    <div className={`${cartBurgerStyles.price} mt-1 mb-1`}>
                        <p className='text text_type_digits-default mr-2'>{data.price}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                    <h5 className={`${cartBurgerStyles.name} text text_type_main-default`}>{data.name}</h5>
                </div>
            </>                                         
        );
    }

export default CartBurger;