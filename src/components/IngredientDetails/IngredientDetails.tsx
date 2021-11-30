import IngredientDetailsStyles from './IngredientDetails.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/types'; 

type TIngredientDetailsProps = {
    isModal?: boolean;
}

type TItems = {
    title: 'Калории, ккал' | 'Белки, г' | 'Жиры, г' | 'Углеводы, г';
    characteristic: number | undefined;
}

/**
 * Компонент отображения состава игредиента
 * @param title - название характеристики ингредиента
 * @param characteristic - числовое выражение характеристики
 * @returns 
 */
const Items: React.FC<TItems> = ({title, characteristic}) => {
    return (
        <div className={IngredientDetailsStyles.item}>
            <p className='text_color_inactive text text_type_main-default' data-qa='ingredient-characteristic-title'>{title}</p>
            <p className='text_color_inactive text text_type_digits-default' data-qa='ingredient-characteristic'>{characteristic}</p>
        </div> 
    )
}

/**
 * Данные игредиента (открываются в модальном окне и в отдельной странице)
 */
function IngredientDetails({isModal}: TIngredientDetailsProps): React.ReactElement {
    const [ingredient, setIngredient] = useState<TIngredient>();
    const { itemsFailed, itemsRequest, items } = useSelector(state => state.burger);
    const { id } = useParams<{id: string}>();
    
    useEffect(
        () => {
            const matchIngredient = items.find((item: TIngredient) => item._id === id);
            setIngredient(matchIngredient);
        },
        [items]
    );

    if ((!ingredient || !items.length) ) {
        return <></>;
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
        <div className={!isModal ? `${IngredientDetailsStyles.page}` : 'ml-25 mr-25'}>
            {!isModal && <h3 className='text text_type_main-large'>Детали ингредиента</h3>}
            <img src={ingredient.image} className={`${IngredientDetailsStyles.img} mb-4`} alt='изображение ингредиента'/>
            <h5 className={`${IngredientDetailsStyles.title} text text_type_main-medium mb-8`} data-qa='ingredient-name'>{ingredient.name}</h5>
            <div className={`${IngredientDetailsStyles.charectiristics} mb-15`}>
                <Items title='Калории, ккал' characteristic={ingredient.calories} />
                <Items title='Белки, г' characteristic={ingredient.proteins} />
                <Items title='Жиры, г' characteristic={ingredient.fat} />
                <Items title='Углеводы, г' characteristic={ingredient.carbohydrates} />
            </div>
        </div>
        )
    }
}

export default IngredientDetails;