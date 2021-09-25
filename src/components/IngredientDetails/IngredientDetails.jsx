import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/burger';
import { useParams } from 'react-router-dom';

const Items = ({title, characteristic}) => {
    return (
        <div className={IngredientDetailsStyles.item}>
            <p className='text_color_inactive text text_type_main-default'>{title}</p>
            <p className='text_color_inactive text text_type_digits-default'>{characteristic}</p>
        </div> 
    )
}

function IngredientDetails({image, name, calories, proteins, fat, carbohydrates}) {
    const [ingredient, setIngredient] = useState(null);
    const dispatch = useDispatch();
    const burgerData = useSelector(state => state.burger.items);
    const { id } = useParams();
    
    useEffect(
        () => {
            if (!image || !name) {
                dispatch(getBurgerIngredients());
            }  
        },
        []
    );

    useEffect(
        () => {
            const matchIngredient = burgerData.find(item => item._id === id);
            setIngredient(matchIngredient);
        },
        [burgerData]
    );

    if ((!ingredient || !burgerData.length) && !image ) {
        return null;
    }

    return (
        <div className={ingredient ? `${IngredientDetailsStyles.page}` : 'ml-25 mr-25'}>
            {ingredient && <h3 className='text text_type_main-large'>Детали ингредиента</h3>}
            <img src={image || ingredient.image} className={`${IngredientDetailsStyles.img} mb-4`} alt='изображение ингредиента'/>
            <h5 className={`${IngredientDetailsStyles.title} text text_type_main-medium mb-8`}>{name || ingredient.name}</h5>
            <div className={`${IngredientDetailsStyles.charectiristics} mb-15`}>
                <Items title='Калории, ккал' characteristic={calories || ingredient.calories} />
                <Items title='Белки, г' characteristic={proteins || ingredient.proteins} />
                <Items title='Жиры, г' characteristic={fat || ingredient.fat} />
                <Items title='Углеводы, г' characteristic={carbohydrates || ingredient.carbohydrates} />
            </div>
        </div>
    )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
};

Items.propTypes = {
    title: PropTypes.string,
    characteristic: PropTypes.number
};