import IngredientDetailsStyles from './IngredientDetails.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/types'; 

type TIngredientDetailsProps = Partial<Pick<TIngredient, 'image' | 'name' | 'calories' | 'proteins' | 'fat' | 'carbohydrates'>>;

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
            <p className='text_color_inactive text text_type_main-default'>{title}</p>
            <p className='text_color_inactive text text_type_digits-default'>{characteristic}</p>
        </div> 
    )
}

/**
 * Данные игредиента (открываются в модальном окне и в отдельной странице)
 */
function IngredientDetails({image, name, calories, proteins, fat, carbohydrates}: TIngredientDetailsProps): React.ReactElement {
    const [ingredient, setIngredient] = useState<TIngredient>();
    const { itemsFailed, itemsRequest, items } = useSelector((state: any) => state.burger);
    const { id } = useParams<{id: string}>();
    
    useEffect(
        () => {
            const matchIngredient = items.find((item: TIngredient) => item._id === id);
            setIngredient(matchIngredient);
        },
        [items]
    );

    if ((!ingredient || !items.length) && !image ) {
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
        <div className={ingredient ? `${IngredientDetailsStyles.page}` : 'ml-25 mr-25'}>
            {ingredient && <h3 className='text text_type_main-large'>Детали ингредиента</h3>}
            <img src={image || ingredient?.image} className={`${IngredientDetailsStyles.img} mb-4`} alt='изображение ингредиента'/>
            <h5 className={`${IngredientDetailsStyles.title} text text_type_main-medium mb-8`}>{name || ingredient?.name}</h5>
            <div className={`${IngredientDetailsStyles.charectiristics} mb-15`}>
                <Items title='Калории, ккал' characteristic={calories || ingredient?.calories} />
                <Items title='Белки, г' characteristic={proteins || ingredient?.proteins} />
                <Items title='Жиры, г' characteristic={fat || ingredient?.fat} />
                <Items title='Углеводы, г' characteristic={carbohydrates || ingredient?.carbohydrates} />
            </div>
        </div>
        )
    }
}

export default IngredientDetails;