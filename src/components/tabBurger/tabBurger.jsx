import tabBurgerStyles from './tabBurger.module.css';
import CartBurger from '../cartBurger/cartBurger';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function TabBurger({type, title}) {
    const burgerData = useSelector(state => state.burger.items);
    return (
        <div>
            <h2 id={type} className='text text_type_main-medium mb-6'>{title}</h2>
            <div className={`${tabBurgerStyles.list} mb-2 pr-4 pl-4`}>
                {burgerData.map((item) => (
                    <CartBurger key={item._id} data={item.type === type ? item : null} />                                     
                ))}
            </div>
        </div> 
    )
}

export default TabBurger;

TabBurger.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
};