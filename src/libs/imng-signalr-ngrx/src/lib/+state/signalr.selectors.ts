import { signalrFeature } from './signalr.reducer';

export const getReceivedMessages = signalrFeature.selectReceivedMessages;

export const getLastReceivedMessage = signalrFeature.selectLastReceivedMessage;

export const getIsConnected = signalrFeature.selectIsConnected;

export const signalrSelectors = {
  getReceivedMessages,
  getLastReceivedMessage,
  getIsConnected,
};
