import {
    getIngredientsRequest, 
    getIngredientsSuccess, 
    getIngredientsFailed,
    getNumberOrderSuccess,
    getNumberOrderFailed,
    getNumberOrderRequest
} from '../store/burger';
import {fetchData} from '../../utils/src';
import {postData} from '../../utils/src';
import { AppDispatch, AppThunk } from '../store'; 

// получаем все доступные ингредиенты для бургеров
export const getBurgerIngredients: AppThunk = () => (dispatch: AppDispatch) => {
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
export const getNumberOrder = (ingredients: string[] ) => (dispatch: AppDispatch) => {
    dispatch(getNumberOrderRequest());
    return postData(ingredients)
           .then((res) => {
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