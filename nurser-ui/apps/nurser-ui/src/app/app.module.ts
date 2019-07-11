import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, META_REDUCERS } from '@ngrx/store';
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
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Auth0OidcModule, Auth0Config } from '@imao/auth0-oidc';
import { AppInsightsNgrxModule, AppInsightsVerboseRootEffects, AppInsightsInfoRootEffects } from '@imai/application-insights-ngrx';
import { DialogsModule } from '@progress/kendo-angular-dialog';


@NgModule({
  declarations: [AppComponent, NavBarComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      { app: appReducer },
      {
        initialState: { app: appInitialState },
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
      }
    ),
    EffectsModule.forRoot([AppEffects, environment.production ? AppInsightsInfoRootEffects : AppInsightsVerboseRootEffects]),
    BsDropdownModule.forRoot(),
    Auth0OidcModule.forRoot(<Auth0Config>environment.auth0_options),
    StoreDevtoolsModule.instrument({
      name: 'nurser',
      logOnly: environment.production
    }),
    AppInsightsNgrxModule.forRoot(environment.appInsights),
    DialogsModule,
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
