import burgerIngredientsReducer from './burger';
import authReducer from './auth';
import ordersListReducer from './orderList';
//import { orderListReducer } from './orderList/reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    burger: burgerIngredientsReducer,
    auth: authReducer,
    orderList: ordersListReducer
  });