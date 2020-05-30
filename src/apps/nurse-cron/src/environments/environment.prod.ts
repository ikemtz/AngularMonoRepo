import { endPoints } from './endpoints';
export const environment = {
  "version": "0.0.0",
  production: true,
  runtimeChecks: {
    strictActionImmutability: false,
    strictStateImmutability: false,
  },
  endPoints,
  appInsights: { instrumentationKey: 'e92419ad-e3e7-488a-81d4-794b498de73e' },
  auth0_options: {
    authority: 'https://nurser.auth0.com',
    client_id: 'NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn',
    audience: 'nurser',
  },
};
