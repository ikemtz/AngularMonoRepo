import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImngNgrxIdleModule } from 'imng-kendo-ngrx-idle';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ImngOidcClientModule } from 'imng-oidc-client';
import { ImngAppInsightsNgrxModule } from 'imng-application-insights-ngrx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app.routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: environment.runtimeChecks,
      },
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ name: 'AdventureWorks' }),
    StoreRouterConnectingModule.forRoot(),
    ImngOidcClientModule.forRoot(environment.oidc_options),
    ImngAppInsightsNgrxModule.forRoot(environment.appInsights),
    BrowserAnimationsModule,
    ImngNgrxIdleModule.forRoot(environment.idleConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
