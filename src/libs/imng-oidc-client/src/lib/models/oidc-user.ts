/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOidcUser {
  id_token: string;
  session_state?: any; //NOSONAR
  access_token: string;
  refresh_token?: string;
  token_type: string;
  scope: string;
  profile: any; //NOSONAR
  expires_at: number;
  state?: string;
  toStorageString?: () => string;
  readonly expires_in?: number;
  readonly expired?: boolean;
  readonly scopes?: string[];
}
