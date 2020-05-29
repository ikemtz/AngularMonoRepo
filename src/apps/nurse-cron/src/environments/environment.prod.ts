import { endPoints } from './endpoints';
export const environment = {
  version: "0.0.0",
  production: true,
  runtimeChecks: {
    strictActionImmutability: false,
    strictStateImmutability: false,
  },
  endPoints,
  appInsights: { instrumentationKey: 'abcb7484-6a9c-48a9-b44a-0ee4364aabc1' },
  auth0_options: {
    authority: 'https://nurser.auth0.com',
    client_id: 'NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn',
    audience: 'nurser',
  },
};
