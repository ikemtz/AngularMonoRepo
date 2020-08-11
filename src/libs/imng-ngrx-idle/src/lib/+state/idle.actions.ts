import { createAction } from '@ngrx/store';

export const onSessionExtended = createAction(
  '[Idle] Session Extended'
);
export const onSessionTimingOut = createAction(
  '[Idle] Session Timing Out'
);
export const signOutRedirect = createAction('[Oidc] sign out redirect');
