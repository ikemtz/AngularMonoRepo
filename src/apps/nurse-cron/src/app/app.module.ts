import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ODataService } from 'imng-kendo-odata';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '@env';
import { AppRoutingModule } from './app.routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Auth0OidcModule } from 'imng-auth0-oidc';
import { ImngAppInsightsNgrxModule } from 'imng-application-insights-ngrx';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: environment.runtimeChecks
      },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({ name: 'NurseCRON' }) : [],
    StoreRouterConnectingModule.forRoot(),
    Auth0OidcModule.forRoot(environment.auth0_options),
    ImngAppInsightsNgrxModule.forRoot(environment.appInsights),
    FontAwesomeModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [ODataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
