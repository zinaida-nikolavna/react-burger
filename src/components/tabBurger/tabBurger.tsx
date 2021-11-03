import tabBurgerStyles from './tabBurger.module.css';
import CartBurger from '../cartBurger/cartBurger';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../utils/types';

type TTabBurgerProps = {
    title: 'Булки' | 'Соусы' | 'Начинки';
    type: 'bun' | 'sauce' | 'main';
}

/**
 * Компонент отображения вкладки
 * @param type - тип булки
 * @param title - заголовок вкладки
 */
function TabBurger({type, title}: TTabBurgerProps): React.ReactElement {
    const burgerData: TIngredient[] = useSelector((state: any) => state.burger.items);
    const filterItems = burgerData.filter((item: TIngredient) => item.type === type);
    return (
        <div>
            <h2 id={type} className='text text_type_main-medium mb-6'>{title}</h2>
            <div className={`${tabBurgerStyles.list} mb-2 pr-4 pl-4`}>
                {filterItems.map((item) => (
                    <CartBurger key={item._id} data={item} />                                
                ))}
            </div>
        </div> 
    )
}

export default TabBurger;