import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'ORDER_LIST_CONNECT'>('ORDER_LIST_CONNECT');
export const disconnect = createAction('ORDER_LIST_DISCONNECT');