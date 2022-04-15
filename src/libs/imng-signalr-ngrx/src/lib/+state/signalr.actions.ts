import { createAction } from '@ngrx/store';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ISignalrMessage } from '../models/signalr.message';

export const connect = createAction('[SignalR] Init Connection');
export const setConnectionState = createPayloadAction<{ isConnected: boolean; }>('[SignalR] Set Connection State');
export const sendMessage = createPayloadAction<ISignalrMessage>('[SignalR] Send Message');
export const receivedMessage = createPayloadAction<ISignalrMessage>('[SignalR] Received Message');
export const clearMessages = createAction('[SignalR] Clear Messages');

export const signalrActions = {
    connect,
    setConnectionState,
    sendMessage,
    receivedMessage,
    clearMessages
};
