import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const Items = ({title, characteristic}) => {
    return (
        <div className={IngredientDetailsStyles.item}>
            <p className='text_color_inactive text text_type_main-default'>{title}</p>
            <p className='text_color_inactive text text_type_digits-default'>{characteristic}</p>
        </div> 
    )
}

function IngredientDetails({image, name, calories, proteins, fat, carbohydrates}) {
    return (
        <div className='ml-25 mr-25'>
            <img src={image} className={`${IngredientDetailsStyles.img} mb-4`} alt='изображение ингредиента'/>
            <h5 className={`${IngredientDetailsStyles.title} text text_type_main-medium mb-8`}>{name}</h5>
            <div className={`${IngredientDetailsStyles.charectiristics} mb-15`}>
                <Items title='Калории, ккал' characteristic={calories} />
                <Items title='Белки, г' characteristic={proteins} />
                <Items title='Жиры, г' characteristic={fat} />
                <Items title='Углеводы, г' characteristic={carbohydrates} />
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