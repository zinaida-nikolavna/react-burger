import {
    getIngredientsRequest, 
    getIngredientsSuccess, 
    getIngredientsFailed,
    getNumberOrderSuccess,
    getNumberOrderFailed,
    getNumberOrderRequest
} from '../reducers/burger';
import {fetchData} from '../../utils/src.js';
import {postData} from '../../utils/src.js';

// получаем все доступные ингредиенты для бургеров
export const getBurgerIngredients = () => (dispatch) => {
    dispatch(getIngredientsRequest());
    return fetchData()
           .then(res => {
                if (res && res.success) {
                    dispatch(getIngredientsSuccess(res.data));
                } else {
                    dispatch(getIngredientsFailed());
              }
            })
            .catch(() => {
                dispatch(getIngredientsFailed());
            })
};

// получаем номер заказа
export const getNumberOrder = (ingredients) => (dispatch) => {
    dispatch(getNumberOrderRequest());
    return postData(ingredients)
           .then(res => {
                if (res && res.success) {
                    dispatch(getNumberOrderSuccess(res.order.number));
                } else {
                    dispatch(getNumberOrderFailed());
              }
            })
            .catch(() => {
                dispatch(getNumberOrderFailed());
            })
};