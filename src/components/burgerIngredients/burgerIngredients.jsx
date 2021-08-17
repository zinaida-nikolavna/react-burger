import burgerIngredientsStyles from './burgerIngredients.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/data';

// Вкладки меню: Булки, соусы, начинки
const TabBurger = (props) => (
    <>
        <h2 className='text text_type_main-medium mb-6'>{props.title}</h2>
        <div className={`${burgerIngredientsStyles.list} mb-2 pr-4 pl-4`}>
            {props.data.map((item) => (
                <CartBurger key={item._id} data={item.type === props.type ? item : null} />                                     
            ))}
        </div>
    </> 
)

// Карточка части бургера
const CartBurger = (props) => {
    if (!props.data) {
        return null;
    } else {
        return (
            <div className={`${burgerIngredientsStyles.cart} mb-8`}>
                <Counter count={1} size='default' />
                <img src={props.data.image} alt='изображение части бургера'/>
                <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
                    <p className='text text_type_digits-default mr-2'>{props.data.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <h5 className={`${burgerIngredientsStyles.name} text text_type_main-default`}>{props.data.name}</h5>
            </div>                                         
        );
    }
}

function BurgerIngredients(props) {
    const burgerIngredientsHeight = window.innerHeight - 250;
    return (
        <section>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <nav className='mb-10'>
                <ul className={burgerIngredientsStyles.tabs}>
                    <li className={`${burgerIngredientsStyles.tab} ${burgerIngredientsStyles.activeTab}`}>Булки</li>
                    <li className={burgerIngredientsStyles.tab}>Соусы</li>
                    <li className={burgerIngredientsStyles.tab}>Начинки</li>
                </ul>
            </nav>
            <div style={{ height: burgerIngredientsHeight, overflow: 'scroll', 'overflowX': 'hidden' }}>
                <TabBurger data={props.data} title='Булки' type='bun'/>
                <TabBurger data={props.data} title='Соусы' type='sauce'/>
                <TabBurger data={props.data} title='Начинки' type='main'/>
            </div>
        </section>
    );
  }
  
  export default BurgerIngredients;

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
  }; 