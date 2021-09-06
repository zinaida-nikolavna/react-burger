import {useState} from 'react';
import cartBurgerStyles from './cartBurger.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/PropTypes';

function CartBurger({data, openIngredientsModal}) {
    const [counter, setCounter] = useState(0); // стейт для счетчика

    /* т.к при открытии модального окна ингредиент сразу добавляется в конструктор,
       то тут же посчитаем при клике счетчик
    */
    const openIngredient = (data) => {
        setCounter(counter + 1);
        openIngredientsModal(data);
    };

    if (!data) {
        return null;
    } else {
        return (
            <>
                <div className={`${cartBurgerStyles.cart} mb-8`} onClick={() => {openIngredient(data)}}>
                    {!!counter && <Counter count={counter} size='default' />}
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

CartBurger.propTypes = {
    data: dataPropTypes,
    openIngredientsModal: PropTypes.func
};