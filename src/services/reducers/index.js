import {burgerIngredientsReducer} from './burger';
import authReducer from './auth';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    burger: burgerIngredientsReducer.reducer,
    auth: authReducer
  });
  
