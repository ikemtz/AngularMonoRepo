import { User as OidcUser } from 'oidc-client';
import { OidcActionsUnion, OidcActionTypes } from './oidc.action';
import { jwtDecoder } from '../util/jwt-decoder';
 

export interface OidcState {
  identity: OidcUser | null;
  permissions: string[];
  loading: boolean;
  expiring: boolean;
  errors: ErrorState;
}

export interface ErrorState {
  silentRenewError: any;
  signInError: any;
}

export const initialState: OidcState = {
  identity: null,
  permissions: [],
  loading: true,
  expiring: false,
  errors: {
    silentRenewError: null,
    signInError: null
  }
};

export function oidcReducer(state = initialState, action: OidcActionsUnion): OidcState {
  switch (action.type) {
    case OidcActionTypes.GetOidcUser:
    case OidcActionTypes.RemoveOidcUser: {
      return {
        ...state,
        loading: true
      };
    }

    case OidcActionTypes.OnUserLoaded: {
      return {
        ...state,
        loading: false,
        expiring: false
      };
    }

    case OidcActionTypes.OnUserUnloaded: {
      return {
        ...state,
        identity: null,
        expiring: false
      };
    }

    case OidcActionTypes.UserFound: {
      return {
        ...state,
        identity: action.payload,
        permissions: jwtDecoder<{ permissions?: [] }>(action.payload.access_token).permissions
      };
    }

    case OidcActionTypes.UserLoading: {
      return {
        ...state,
        loading: true
      };
    }

    case OidcActionTypes.UserDoneLoading: {
      return {
        ...state,
        loading: false
      };
    }

    case OidcActionTypes.OnAccessTokenExpiring: {
      return {
        ...state,
        expiring: true
      };
    }

    case OidcActionTypes.UserExpired: {
      return {
        ...state,
        expiring: false
      };
    }

    case OidcActionTypes.OnSilentRenewError: {
      return {
        ...state,
        errors: {
          ...state.errors,
          silentRenewError: {
            message: action.payload.message,
            name: action.payload.name,
            stack: action.payload.stack
          }
        }
      };
    }

    case OidcActionTypes.SignInError: {
      return {
        ...state,
        errors: {
          ...state.errors,
          signInError: {
            message: action.payload.message,
            name: action.payload.name,
            stack: action.payload.stack
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}
