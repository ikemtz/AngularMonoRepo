import { createAction, props } from '@ngrx/store';
import { MsalEntity } from './msal.models';

export const loadMsal = createAction('[Msal] Load Msal');

export const loadMsalSuccess = createAction('[Msal] Load Msal Success', props<{ msal: MsalEntity[] }>());

export const loadMsalFailure = createAction('[Msal] Load Msal Failure', props<{ error: any }>());
