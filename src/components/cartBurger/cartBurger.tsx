import cartBurgerStyles from './cartBurger.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { useDrag } from "react-dnd";
import { TIngredient } from '../../utils/types';
import { Link, useLocation } from "react-router-dom";
import {Location} from 'history';

type TCartBurgerProps = {
    data: TIngredient;
}

/**
 * Компонент записи(ингредиент) в реестре ингредиентов
 * @param data - данные ингредиента
 * @returns 
 */
function CartBurger({data}: TCartBurgerProps): React.ReactElement {
    let location = useLocation<Location>();
    const counter = useSelector(state => state.burger.counter);
    const id = data._id;
    const type = data.type;
    const [{isDragging}, dragRef] = useDrag({
        type: 'ingredient',
        item: {id, type},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

        return (
            <>
                <div ref={dragRef} style={{ border: isDragging ? '2px solid lightgreen' : '0px'}} className={`${cartBurgerStyles.cart} mb-8`}>
                    <Link
                        className={cartBurgerStyles.link}
                        to={{
                        pathname: `/ingredients/${id}`,
                        state: { background: location },
                    }}>
                    {!!counter[id] && <Counter count={counter[id]} size='default' />}
                    <img src={data.image} alt='изображение ингредиента'/>
                    <div className={`${cartBurgerStyles.price} mt-1 mb-1`}>
                        <p className='text text_type_digits-default mr-2'>{data.price}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                    <h5 className={`${cartBurgerStyles.name} text text_type_main-default`}>{data.name}</h5>
                    </Link>
                </div>
            </>                                         
        );
    }

export default CartBurger;