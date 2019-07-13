import { NgModule, ModuleWithProviders, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';
import { auth0Configurator } from './auth0-configurator';
import { Auth0Config, AUTH0_CONFIG } from './auth0-config';
import { OidcEffects } from './effects/oidc.effect';
import { OIDC_CONFIG } from './models/config.model';
import { OidcService } from './services/oidc.service';
import { OidcFacade } from './facades/oidc.facade';
import { StoreModule } from '@ngrx/store';
import { oidcReducer } from './reducers/oidc.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Auth0Facade } from './auth0-facade';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('oidc', oidcReducer),
    EffectsModule.forFeature([OidcEffects])
  ],
  providers: [
    { provide: OIDC_CONFIG, useFactory: auth0Configurator, deps: [AUTH0_CONFIG] },
    OidcService,
    OidcFacade,
    OidcEffects,
    Auth0Facade,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
      deps: [OidcFacade]
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

