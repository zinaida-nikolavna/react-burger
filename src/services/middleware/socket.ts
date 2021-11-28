import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from '../store'; 

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { payload } = action;
        const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

        if (wsConnect.match(action)) {
          socket = new WebSocket(payload);
        }
        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen());
          };
  
          socket.onerror = () => {
            dispatch(onError('ошибка'));
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          };
  
          socket.onclose = () => {
            dispatch(onClose());
          };
  
          if (wsSendMessage?.match(action)) {
            socket.send(JSON.stringify(payload));
          }

          if (wsDisconnect?.match(action)) {
            socket.close();
          }
        }
  
        next(action);
      };
    };
  };
  