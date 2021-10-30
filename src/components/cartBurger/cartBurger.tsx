import cartBurgerStyles from './cartBurger.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { showIngredient } from '../../services/store/burger';
import { useDrag } from "react-dnd";
import { TIngredient } from '../../utils/types';

function CartBurger({data}: any): React.ReactElement {
    const counter = useSelector((state: any) => state.burger.counter);
    const dispatch = useDispatch();
    const id = data ? data._id : null;
    const type = data ? data.type : null;
    const [{isDragging}, dragRef] = useDrag({
        type: 'ingredient',
        item: {id, type},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const openedIngredient = () => {
        dispatch(showIngredient(data));
        window.history.pushState({}, '', `http://localhost:3000/ingredients/${id}`);
    }

    if (!data) {
        return <></>;
    } else {
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
}

export default CartBurger;