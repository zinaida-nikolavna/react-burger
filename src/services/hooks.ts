import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { AppDispatch, RootState, AppThunk } from '../utils/types';
  
  export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;