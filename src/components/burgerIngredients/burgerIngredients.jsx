import {useState} from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/PropTypes';
import Modal from '../modal/modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails'

// Вкладки меню: Булки, соусы, начинки
const TabBurger = ({data, type, title}) => (
    <>
        <h2 className='text text_type_main-medium mb-6'>{title}</h2>
        <div className={`${burgerIngredientsStyles.list} mb-2 pr-4 pl-4`}>
            {data.map((item) => (
                <CartBurger key={item._id} data={item.type === type ? item : null} />                                     
            ))}
        </div>
    </> 
)

// Карточка части бургера
const CartBurger = ({data}) => {
    const [isOpenModal, setModal] = useState(false);

    if (!data) {
        return null;
    } else {
        return (
            <>
                <Modal title='Детали ингредиента' isOpened={isOpenModal} onModalClose={() => setModal(false)}>
                    <IngredientDetails 
                        image={data.image}
                        name={data.name}
                        calories={data.calories}
                        proteins={data.proteins}
                        fat={data.fat}
                        carbohydrates={data.carbohydrates} />
                </Modal>
                <div className={`${burgerIngredientsStyles.cart} mb-8`} onClick={() => setModal(true)}>
                    <Counter count={1} size='default' />
                    <img src={data.image} alt='изображение ингредиента'/>
                    <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
                        <p className='text text_type_digits-default mr-2'>{data.price}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                    <h5 className={`${burgerIngredientsStyles.name} text text_type_main-default`}>{data.name}</h5>
                </div>
            </>                                         
        );
    }
}

function BurgerIngredients({data}) {
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
                <TabBurger data={data} title='Булки' type='bun'/>
                <TabBurger data={data} title='Соусы' type='sauce'/>
                <TabBurger data={data} title='Начинки' type='main'/>
            </div>
        </section>
    );
  }
  
  export default BurgerIngredients;

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
  }; 