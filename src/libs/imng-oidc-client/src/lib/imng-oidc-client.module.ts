import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthGuard } from './services/auth-guard';
import { oidcConfigurator } from './util/oidc-client-configurator';
import {
  OidcClientConfig,
  OIDC_CLIENT_CONFIG,
} from './models/oidc-client-config';
import { OidcEffects } from './+state/oidc.effects';
import { OidcService } from './services/oidc.service';
import { OidcFacade } from './+state/oidc.facade';
import { StoreModule, Store } from '@ngrx/store';
import { oidcFeature } from './+state/oidc.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OidcUserFacade } from './+state/oidc-user.facade';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccessDeniedComponent } from './components/access-denied.component';
import { SupportComponent } from './support/support.component';
import { ImngOidcClientRoutingModule } from './img-oidc-client-routing.module';
import { LogoutSuccessComponent } from './components/logout-success.component';
import { OIDC_LIBRARY_CONFIG } from './models/oidc-library-config';

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
    OidcEffects,
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
    oidc0ptions: OidcClientConfig
  ): ModuleWithProviders<ImngOidcClientModule> {
    return {
      ngModule: ImngOidcClientModule,
      providers: [{ provide: OIDC_CLIENT_CONFIG, useValue: oidc0ptions }],
    };
  }
}
