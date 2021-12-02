import orderListSlice from './orderList';

const initialState = {
    status: 'OFFLINE',
    connectionError: '',
    orders: null
}

import {
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} from './orderList';

describe('Reducer burger', () => {

    test('should return initial state', () => {
        expect(orderListSlice(undefined, {})).toEqual(initialState)
    }),

    test('should return wsOpen true', () => {
        expect(orderListSlice(initialState, {type: wsOpen})).toEqual(
            expect.objectContaining({
                status: 'ONLINE'
            })
        )
    }),

    test('should return wsClose true', () => {
        expect(orderListSlice(initialState, {type: wsClose})).toEqual(
            expect.objectContaining({
                status: 'OFFLINE'
            })
        )
    }),

    test('should return wsError true', () => {
        expect(orderListSlice(initialState, {type: wsError, payload: 'error'})).toEqual(
            expect.objectContaining({
                connectionError: 'error'
            })
        )
    }),

    test('should return wsMessage true', () => {
        expect(orderListSlice(initialState, {type: wsMessage, payload: ['123213123']})).toEqual(
            expect.objectContaining({
                orders: ['123213123']
            })
        )
    })
})