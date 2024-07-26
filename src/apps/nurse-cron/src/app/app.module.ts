import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ODataService } from 'imng-kendo-odata';
import { AppRoutingModule } from './app.routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ImngOidcClientModule } from 'imng-oidc-client';
import { ImngAppInsightsNgrxModule } from 'imng-application-insights-ngrx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImngSignalrNgrxModule } from 'imng-signalr-ngrx';
import { MessagingComponent } from './messaging/messaging.component';
import { ImngNgrxIdleModule } from 'imng-kendo-ngrx-idle';
import { environment } from '../environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent, NavBarComponent, MessagingComponent],
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
    StoreDevtoolsModule.instrument({ name: 'Nurse-CRON', connectInZone: true }),
    StoreRouterConnectingModule.forRoot(),
    ImngOidcClientModule.forRoot(environment.oidc_options),
    ImngAppInsightsNgrxModule.forRoot(environment.appInsights),
    ImngSignalrNgrxModule.forRoot(environment.signalr),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ImngNgrxIdleModule.forRoot(environment.idleConfig),
  ],
  providers: [ODataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
