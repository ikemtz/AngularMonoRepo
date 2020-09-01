import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthGuard } from './services/auth-guard';
import { auth0Configurator } from './util/auth0-configurator';
import { Auth0Config, AUTH0_CONFIG } from './models/auth0-config';
import { OidcEffects } from './+state/oidc.effects';
import { OIDC_CONFIG } from './models/config.model';
import { OidcService } from './services/oidc.service';
import { OidcFacade } from './+state/oidc.facade';
import { StoreModule, Store } from '@ngrx/store';
import { oidcReducer, OIDC_FEATURE_KEY } from './+state/oidc.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Auth0Facade } from './+state/auth0.facade';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccessDeniedComponent } from './components/access-denied.component';
import { SupportComponent } from './support/support.component';
import { Auth0OidcRoutingModule } from './auth0-oidc-routing.module';
import { LogoutSuccessComponent } from './components/logout-success.component';

@NgModule({
  declarations: [AccessDeniedComponent, SupportComponent, LogoutSuccessComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(OIDC_FEATURE_KEY, oidcReducer),
    EffectsModule.forFeature([OidcEffects]),
    Auth0OidcRoutingModule,
  ],
  exports: [AccessDeniedComponent, SupportComponent, LogoutSuccessComponent],
  providers: [
    { provide: OIDC_CONFIG, useFactory: auth0Configurator, deps: [AUTH0_CONFIG, DOCUMENT] },
    OidcService,
    OidcFacade,
    OidcEffects,
    Auth0Facade,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
      deps: [Store]
    }
  ]
})
export class Auth0OidcModule {
  static forRoot(auth00ptions: Auth0Config): ModuleWithProviders<Auth0OidcModule> {
    return {
      ngModule: Auth0OidcModule,
      providers: [
        { provide: AUTH0_CONFIG, useValue: auth00ptions },
      ]
    };
  }
}

