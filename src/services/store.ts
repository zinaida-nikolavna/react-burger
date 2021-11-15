import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store/index';
import { socketMiddleware } from '../services/middleware/socket';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';
import { connect as OrderListWsConnect, disconnect as OrderListWsDisconnect } from '../services/store/orderList/actions';
import { 
    wsOpen as OrderListWsOpen, 
    wsClose as OrderListWsClose, 
    wsError as OrderListWsError, 
    wsMessage as OrderListWsMessage 
} from '../services/store/orderList';


const wsActions = {
    wsConnect: OrderListWsConnect,
    wsDisconnect: OrderListWsDisconnect,
    onOpen: OrderListWsOpen,
    onClose: OrderListWsClose,
    onError: OrderListWsError,
    onMessage: OrderListWsMessage
}

const orderListMiddleware = socketMiddleware(wsActions);

export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, RootState, unknown, AnyAction>>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(orderListMiddleware)
    }
});

export type AppDispatch = typeof store.dispatch; 
export type RootState = ReturnType<typeof rootReducer>;
