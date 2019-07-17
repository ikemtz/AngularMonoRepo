import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthGuard } from './services/auth-guard';
import { auth0Configurator } from './util/auth0-configurator';
import { Auth0Config, AUTH0_CONFIG } from './models/auth0-config';
import { OidcEffects } from './+state/oidc.effect';
import { OIDC_CONFIG } from './models/config.model';
import { OidcService } from './services/oidc.service';
import { OidcFacade } from './+state/oidc.facade';
import { StoreModule } from '@ngrx/store';
import { oidcReducer } from './+state/oidc.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Auth0Facade } from './+state/auth0.facade';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccessDeniedComponent } from './components/access-denied.component';

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('oidc', oidcReducer),
    EffectsModule.forFeature([OidcEffects])
  ],
  exports: [AccessDeniedComponent],
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
      multi: true
    }
  ]
})
export class Auth0OidcModule {
  static forRoot(auth0_options: Auth0Config): ModuleWithProviders<Auth0OidcModule> {
    return {
      ngModule: Auth0OidcModule,
      providers: [
        { provide: AUTH0_CONFIG, useValue: auth0_options },
      ]
    };
  }
}

