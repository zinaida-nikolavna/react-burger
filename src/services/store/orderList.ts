import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TOrderResponse} from '../../utils/types';

enum WebSocketStatus {
    CONNECTING  = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

type TState = {
    status: WebSocketStatus,
    connectionError: string,
    orders: TOrderResponse | null
}

const initialState: TState = {
    status: WebSocketStatus.OFFLINE,
    connectionError: '',
    orders: null
}

export const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        wsOpen: (state) => {
            state.status = WebSocketStatus.ONLINE;
        },
        wsClose: (state) => {
            state.status = WebSocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrderResponse>) => {
            state.orders = action.payload;
        },
    }
})

export const {
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} = orderListSlice.actions;

export default orderListSlice.reducer;