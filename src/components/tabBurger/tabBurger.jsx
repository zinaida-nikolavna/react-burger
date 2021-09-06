import {useContext} from 'react';
import tabBurgerStyles from './tabBurger.module.css';
import CartBurger from '../cartBurger/cartBurger';
import PropTypes from 'prop-types';
import {AppContext} from '../../utils/appContext.js';

function TabBurger({type, title, openIngredientsModal}) {
    const burgerData = useContext(AppContext);
    return (
        <>
            <h2 className='text text_type_main-medium mb-6'>{title}</h2>
            <div className={`${tabBurgerStyles.list} mb-2 pr-4 pl-4`}>
                {burgerData.map((item) => (
                    <CartBurger openIngredientsModal={openIngredientsModal} key={item._id} data={item.type === type ? item : null} />                                     
                ))}
            </div>
        </> 
    )
}

export default TabBurger;

TabBurger.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    openIngredientsModal: PropTypes.func
};