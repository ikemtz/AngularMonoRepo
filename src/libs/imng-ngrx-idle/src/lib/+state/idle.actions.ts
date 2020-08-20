import { createAction } from '@ngrx/store';
import { IdleConfig } from '../idle-config';
import { createPayloadAction } from 'imng-ngrx-utils';

export const onSessionExtended = createAction(
  '[Idle] Session Extended'
);
export const onSessionTimingOut = createPayloadAction<IdleConfig>(
  '[Idle] Session Timing Out'
);
export const signOutRedirect = createAction('[Oidc] sign out redirect');
