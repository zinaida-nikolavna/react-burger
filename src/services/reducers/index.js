import {burgerIngredientsReducer} from './burger';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    burger: burgerIngredientsReducer.reducer
  });
  
