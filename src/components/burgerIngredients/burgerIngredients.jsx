import {useState, useContext} from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import Modal from '../modal/modal';
import TabBurger from '../tabBurger/tabBurger';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {IngredientsContext} from '../../utils/appContext.js';

function BurgerIngredients() {
    const burgerIngredientsHeight = window.innerHeight - 250;
    const [isOpenModal, setModal] = useState(false); 
    const [ingredients, setItem] = useState(null);
    const [ingredientsData, setIngredients] = useContext(IngredientsContext);

    const OpenModal = (item) => {
        setIngredients([...ingredientsData, item]); // добавляем в контекст новый ингредиент из конструктора
        setModal(true);
        setItem(item); // сетим ингредиент для дальнейшего использования в верстке
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
                <TabBurger title='Булки' type='bun' openIngredientsModal={OpenModal}/>
                <TabBurger title='Соусы' type='sauce' openIngredientsModal={OpenModal}/>
                <TabBurger title='Начинки' type='main' openIngredientsModal={OpenModal}/>
            </div>
        </section>
    );
  }
  
  export default BurgerIngredients;