import burgerConstructorStyles from './burgerConstructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/data' 

function BurgerConstructor(props) {
    const burgerConstructorHeight = window.innerHeight - 500;
    // находим первый в массиве элемент с типом булка
    const bun = props.data.find(item => {
        return item.type === 'bun';
    })
    return (
        <section className={`${burgerConstructorStyles.list} mt-25`}>
            <div className={`${burgerConstructorStyles.flexEnd} pr-4`}>
                <ConstructorElement 
                    type='top' 
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image} />
            </div>    
            <div style={{ height: burgerConstructorHeight }} className={`${burgerConstructorStyles.container} pr-2 mt-2 mb-2`}>
                {props.data.map((item) => (
                    <div key={item._id} className={burgerConstructorStyles.listItem}>
                        {item.type !== 'bun' && <DragIcon type="primary" />}
                        {item.type !== 'bun' && 
                        <ConstructorElement
                            type={undefined}
                            isLocked={true}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}/>}
                    </div>                                 
                ))}
            </div>
            <div className={`${burgerConstructorStyles.flexEnd} pr-4`}>
                <ConstructorElement 
                    type='bottom' 
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image} /> 
            </div>
            <div className={`${burgerConstructorStyles.flex} ${burgerConstructorStyles.order} mt-10 mb-13`}>
                <div className={`${burgerConstructorStyles.flex} ${burgerConstructorStyles.alignCenter} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
  }
  
  export default BurgerConstructor;
  
  BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
  }; 