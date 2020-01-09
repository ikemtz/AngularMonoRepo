export interface IOidcUser {
  id_token: string;
  session_state: any;
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
  profile: any;
  expires_at: number;
  state?: any;

  readonly expires_in?: number;
  readonly expired?: boolean;
  readonly scopes?: string[];
}
