import { store } from '../index';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
 };

export type TIngredients = {
  _id: Pick<TIngredient, '_id'>
}

export type TForm = {
  email: string;
  password: string;
  name: string;
};

export type submitCallback = (e: React.FormEvent<HTMLFormElement>) => void;

export type AppDispatch = typeof store.dispatch; 

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, RootState, unknown, AnyAction>>;