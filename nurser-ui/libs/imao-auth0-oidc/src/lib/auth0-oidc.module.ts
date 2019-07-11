import { NgModule, ModuleWithProviders, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';
import { auth0Configurator } from './auth0-configurator';
import { Auth0Config, AUTH0_CONFIG } from './auth0-config';
import { OidcEffects } from './effects/oidc.effect';
import { OIDC_CONFIG } from './models';
import { OidcService } from './services/oidc.service';
import { OidcFacade } from './facades/oidc.facade';
import { StoreModule } from '@ngrx/store';
import { oidcReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { Auth0Facade } from './auth0-facade';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('oidc', oidcReducer),
    EffectsModule.forFeature([OidcEffects]),
    HttpClientModule
  ],
  providers: [OidcEffects]
})
export class Auth0OidcModule {
  static forRoot(auth0_options: Auth0Config): ModuleWithProviders {
    return {
      ngModule: Auth0OidcModule,
      providers: [
        { provide: AUTH0_CONFIG, multi: false, useValue: auth0_options },
        { provide: OIDC_CONFIG, multi: false, useFactory: auth0Configurator, deps: [AUTH0_CONFIG] },
        OidcService,
        OidcFacade,
        Auth0Facade,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
          deps: [OidcFacade]
        }
      ]
    };
  }
}
