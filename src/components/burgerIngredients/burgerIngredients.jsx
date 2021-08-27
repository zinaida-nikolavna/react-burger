import {useState} from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/PropTypes';
import Modal from '../modal/modal';
import TabBurger from '../tabBurger/tabBurger';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function BurgerIngredients({data}) {
    const burgerIngredientsHeight = window.innerHeight - 250;

    const [isOpenModal, setModal] = useState(false); 
    const [ingredients, setItem] = useState(null);

    const OpenModal = (item) => {
        setModal(true);
        setItem(item);
    }

    return (
        <section>
            {isOpenModal && ingredients && 
            <Modal title='Детали ингредиента' isOpened={isOpenModal} onModalClose={() => setModal(false)}>
                    <IngredientDetails 
                        image={ingredients.image}
                        name={ingredients.name}
                        calories={ingredients.calories}
                        proteins={ingredients.proteins}
                        fat={ingredients.fat}
                        carbohydrates={ingredients.carbohydrates} />
            </Modal>}
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <nav className='mb-10'>
                <ul className={burgerIngredientsStyles.tabs}>
                    <li className={`${burgerIngredientsStyles.tab} ${burgerIngredientsStyles.activeTab}`}>Булки</li>
                    <li className={burgerIngredientsStyles.tab}>Соусы</li>
                    <li className={burgerIngredientsStyles.tab}>Начинки</li>
                </ul>
            </nav>
            <div style={{ height: burgerIngredientsHeight, overflow: 'scroll', 'overflowX': 'hidden' }}>
                <TabBurger data={data} title='Булки' type='bun' openIngredientsModal={OpenModal}/>
                <TabBurger data={data} title='Соусы' type='sauce' openIngredientsModal={OpenModal}/>
                <TabBurger data={data} title='Начинки' type='main' openIngredientsModal={OpenModal}/>
            </div>
        </section>
    );
  }
  
  export default BurgerIngredients;

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
  }; 