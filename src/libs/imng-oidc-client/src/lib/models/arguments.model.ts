/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestArugments {
  // mandatory
  url?: string;
  client_id?: string;
  redirect_uri?: string;
  response_type?: string;
  scope?: string;
  authority?: string;
  // optional
  data?: any; //NOSONAR
  state?: string;
  prompt?: string;
  display?: string;
  max_age?: number;
  ui_locales?: string;
  id_token_hint?: string;
  login_hint?: string;
  acr_values?: string;
  resource?: string;
  request?: any; //NOSONAR
  request_uri?: string;
  extraQueryParams?: any; //NOSONAR
}
