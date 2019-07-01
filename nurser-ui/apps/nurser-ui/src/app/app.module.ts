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
        authority: 'https://nurser.auth0.com',
        client_id: 'NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn',
        extraQueryParams: { audience: 'nurser' },
        redirect_uri: 'http://localhost:4200/callback.html',
        response_type: 'id_token token',
        scope: 'openid profile offline_access email',
        post_logout_redirect_uri: 'http://localhost:4200/signout-callback.html',
        silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
        automaticSilentRenew: true,
        metadata: {
          issuer: 'https://nurser.auth0.com/',
          authorization_endpoint: 'https://nurser.auth0.com/authorize',
          userinfo_endpoint: 'https://nurser.auth0.com/userinfo',
          end_session_endpoint:
            'https://nurser.auth0.com/v2/logout?client_id=NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn&returnTo=http%3A%2F%2Flocalhost%3A4200%2Fsignout-callback.html'
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
