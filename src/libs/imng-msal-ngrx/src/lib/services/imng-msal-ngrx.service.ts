import { Injectable, Inject } from '@angular/core';
import { MSAL_CONFIG } from '../../contstants';
import { UserAgentApplication, Configuration, AuthenticationParameters } from '@azure/msal';
import { TemporaryCacheKeys } from '@azure/msal/lib-commonjs/utils/Constants';

@Injectable({
  providedIn: 'root',
})
export class MsalNgrxService extends UserAgentApplication {
  constructor(@Inject(MSAL_CONFIG) private msalConfig: Configuration) {
    super({
      ...msalConfig,
      auth: {
        ...msalConfig.auth,
        validateAuthority: false,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
      },
    });
    this.handleRedirectCallback(this.authRedirectCallBack);
  }

  public loginRedirect(authenticationParameters: AuthenticationParameters = {}) {
    this.cacheStorage.setItem(TemporaryCacheKeys.URL_HASH, window.location.hash);
    super.loginRedirect(authenticationParameters);
  }

  public authRedirectCallBack(error, response) {
    if (error) {
      console.log(error);
    } else {
      const account = this.getAccount();
      if (account) {
        console.log('id_token acquired at: ' + new Date().toString());
      } else if (response.tokenType === 'access_token') {
        console.log('access_token acquired at: ' + new Date().toString());
      } else {
        console.log('token type is:' + response.tokenType);
      }
    }
  }
}
