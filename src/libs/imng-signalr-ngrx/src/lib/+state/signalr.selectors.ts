import { signalrFeature } from './signalr.reducer';

export const signalrSelectors = {
  selectReceivedMessages: signalrFeature.selectReceivedMessages,
  selectLastReceivedMessage: signalrFeature.selectLastReceivedMessage,
  selectIsConnected: signalrFeature.selectIsConnected,
};
