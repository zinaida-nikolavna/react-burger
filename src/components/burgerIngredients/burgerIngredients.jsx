import burgerIngredientsStyles from './burgerIngredients.module.css';
import Modal from '../modal/modal';
import TabBurger from '../tabBurger/tabBurger';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { closeIngredient } from '../../services/reducers/burger';
import {useEffect, useRef} from 'react';

function BurgerIngredients() {
    const dispatch = useDispatch();

    // получаем данные о том, какой ингредиент показывать в модальном окне
    const ingredient = useSelector(state => state.burger.showedIngredient);

    const tabsRef = useRef();
    const navRef = useRef();

    useEffect(() => {
        // рассчитываем выделение вкладки при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    const id = entry.target.id;
                    navRef.current.querySelectorAll('li').forEach((el) => {
                        if (el.id === id) {
                            el.classList.add(`${burgerIngredientsStyles.activeTab}`);
                        } else {
                            el.classList.remove(`${burgerIngredientsStyles.activeTab}`);
                        }
                    });
                }
            })
        }, {
            root: tabsRef.current,
            rootMargin: '0px 0px -80% 0px',
            threshold: 0.5
        })
        tabsRef.current.querySelectorAll("h2").forEach(
            (section) => observer.observe(section)
        );
    }, []);

    return (
        <section>
            {ingredient && 
            <Modal title='Детали ингредиента' isOpened={!!ingredient} onModalClose={() => dispatch(closeIngredient())}>
                    <IngredientDetails 
                        image={ingredient.image}
                        name={ingredient.name}
                        calories={ingredient.calories}
                        proteins={ingredient.proteins}
                        fat={ingredient.fat}
                        carbohydrates={ingredient.carbohydrates} />
            </Modal>}
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <nav ref={navRef}>
                <ul className={burgerIngredientsStyles.tabs}>
                    <li className={`${burgerIngredientsStyles.tab}`} id='bun'>Булки</li>
                    <li className={burgerIngredientsStyles.tab} id='sauce'>Соусы</li>
                    <li className={burgerIngredientsStyles.tab} id='main'>Начинки</li>
                </ul>
            </nav>
            <div ref={tabsRef} className="pt-10" style={{ height: '610px', overflow: 'scroll', 'overflowX': 'hidden' }}>
                <TabBurger title='Булки' type='bun' />
                <TabBurger className="tab" title='Соусы' type='sauce' />
                <TabBurger className="tab" title='Начинки' type='main' />
            </div>
        </section>
    );
  }
  
  export default BurgerIngredients;