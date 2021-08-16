import burgerConstructorStyles from './burgerConstructor.module.css';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../utils/data' 

function BurgerConstructor(props: any) {
    const burgerConstructorHeight = window.innerHeight - 310;
    return (
        <section className={`${burgerConstructorStyles.list} mt-25`}>
            <div className={`${burgerConstructorStyles.container} pr-2`}
                style={{ height: burgerConstructorHeight }}>
                {props.data.map((item: any, index: number) => (
                    <div key={item._id}>
                        <div className={burgerConstructorStyles.listItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type={index === 0 ? 'top' : index  === props.data.length - 1 ? 'bottom' : undefined}
                                isLocked={true}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />      
                        </div>                                 
                    </div>
                ))}
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