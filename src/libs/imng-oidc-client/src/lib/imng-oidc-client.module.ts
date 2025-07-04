import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ModuleWithProviders, DOCUMENT } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { OidcUserFacade } from './+state/oidc-user.facade';
import { OidcEffects } from './+state/oidc.effects';
import { OidcFacade } from './+state/oidc.facade';
import { oidcFeature } from './+state/oidc.reducer';
import { AccessDeniedComponent } from './components/access-denied.component';
import { LogoutSuccessComponent } from './components/logout-success.component';
import { ImngOidcClientRoutingModule } from './img-oidc-client-routing.module';
import {
  OIDC_CLIENT_CONFIG,
  OidcClientConfig,
} from './models/oidc-client-config';
import { OIDC_LIBRARY_CONFIG } from './models/oidc-library-config';
import { AuthGuard } from './services/auth-guard';
import { OidcService } from './services/oidc.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SupportComponent } from './support/support.component';
import { oidcConfigurator } from './util/oidc-client-configurator';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    SupportComponent,
    LogoutSuccessComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(oidcFeature),
    EffectsModule.forFeature([OidcEffects]),
    ImngOidcClientRoutingModule,
  ],
  exports: [AccessDeniedComponent, SupportComponent, LogoutSuccessComponent],
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
