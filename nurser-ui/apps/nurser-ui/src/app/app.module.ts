import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  APP_FEATURE_KEY,
  initialState as appInitialState,
  appReducer
} from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { AppFacade } from './+state/app.facade';
import { NxModule } from '@nrwl/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { Log, WebStorageStateStore } from 'oidc-client';
import { NgOidcClientModule } from 'ng-oidc-client';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent, NavBarComponent, HomeComponent],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      { app: appReducer },
      {
        initialState: { app: appInitialState },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    BsDropdownModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgOidcClientModule.forRoot({
      oidc_config: {
        authority: environment.oidc_config.authority,
        client_id: environment.oidc_config.client_id,
        extraQueryParams: { audience: environment.oidc_config.audience },
        redirect_uri: `${window.location.origin}/callback.html`,
        response_type: 'id_token token',
        scope: 'openid profile offline_access email',
        post_logout_redirect_uri: `${window.location.origin}/signout-callback.html`,
        silent_redirect_uri: `${window.location.origin}/renew-callback.html`,
        automaticSilentRenew: true,
        metadata: {
          issuer: `${environment.oidc_config.authority}/`,
          authorization_endpoint: `${environment.oidc_config.authority}/authorize`,
          userinfo_endpoint: `${environment.oidc_config.authority}/userinfo`,
          end_session_endpoint:
          `${environment.oidc_config.authority}/v2/logout?client_id=NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn&returnTo=${window.location.origin}/signout-callback.html`
        },
        stateStore: new WebStorageStateStore({ store: localStorage }),
      }, log: {
        logger: console,
        level: Log.DEBUG
      }
    })
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
