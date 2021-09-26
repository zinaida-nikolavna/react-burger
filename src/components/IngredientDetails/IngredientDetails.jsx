import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const { itemsFailed, itemsRequest, items } = useSelector(state => state.burger);
    const { id } = useParams();
    
    useEffect(
        () => {
            const matchIngredient = items.find(item => item._id === id);
            setIngredient(matchIngredient);
        },
        [items]
    );

    if ((!ingredient || !items.length) && !image ) {
        return null;
    }

    if (itemsFailed) {
        return (
          <div className={IngredientDetailsStyles.page}>
            Что-то пошло не так... Перезагрузите страницу
          </div>
        )
    } else if (itemsRequest) {
        return (
          <div className={IngredientDetailsStyles.page}>
            Загрузка...
          </div> 
        )
    } else {
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