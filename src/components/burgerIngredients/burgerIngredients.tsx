import {useEffect, useRef} from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import TabBurger from '../tabBurger/tabBurger';;

/**
 * реестр ингредиентов
 */
function BurgerIngredients(): React.ReactElement {

    const tabsRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // рассчитываем выделение вкладки при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    const id = entry.target.id;
                    navRef.current?.querySelectorAll('li').forEach((el) => {
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
        tabsRef.current?.querySelectorAll("h2").forEach(
            (section) => observer.observe(section)
        );
    }, []);

    return (
        <section>
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
                <TabBurger title='Соусы' type='sauce' />
                <TabBurger title='Начинки' type='main' />
            </div>
        </section>
    );
  }
  
  export default BurgerIngredients;