import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule, ModuleWithProviders, DOCUMENT } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { OidcUserFacade } from './+state/oidc-user.facade';
import { OidcEffects } from './+state/oidc.effects';
import { OidcFacade } from './+state/oidc.facade';
import { oidcFeature } from './+state/oidc.reducer';
import { IMNG_ACCESS_DENIED } from './components/access-denied.component';
import { IMNG_LOGOUT_SUCCESS } from './components/logout-success.component';
import { ImngOidcClientRoutingModule } from './img-oidc-client-routing.module';
import {
  OIDC_CLIENT_CONFIG,
  OidcClientConfig,
} from './models/oidc-client-config';
import { OIDC_LIBRARY_CONFIG } from './models/oidc-library-config';
import { AuthGuard } from './services/auth-guard';
import { OidcService } from './services/oidc.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { IMNG_USER_SUPPORT } from './support/support.component';
import { oidcConfigurator } from './util/oidc-client-configurator';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(oidcFeature),
    EffectsModule.forFeature([OidcEffects]),
    ImngOidcClientRoutingModule,
    IMNG_ACCESS_DENIED,
    IMNG_USER_SUPPORT,
    IMNG_LOGOUT_SUCCESS,
  ],
  exports: [IMNG_ACCESS_DENIED, IMNG_USER_SUPPORT, IMNG_LOGOUT_SUCCESS],
  providers: [
    {
      provide: OIDC_LIBRARY_CONFIG,
      useFactory: oidcConfigurator,
      deps: [OIDC_CLIENT_CONFIG, DOCUMENT],
    },
    OidcService,
    OidcFacade,
    OidcUserFacade,
    AuthGuard,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
      deps: [Store],
    },
  ],
})
export class ImngOidcClientModule {
  static forRoot(
    oidc0ptions: OidcClientConfig,
  ): ModuleWithProviders<ImngOidcClientModule> {
    return {
      ngModule: ImngOidcClientModule,
      providers: [{ provide: OIDC_CLIENT_CONFIG, useValue: oidc0ptions }],
    };
  }
}
