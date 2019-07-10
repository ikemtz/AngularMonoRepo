import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';
import { NgOidcClientModule, OIDC_CONFIG } from 'ng-oidc-client';
import { auth0Configurator } from './auth0-configurator';
import { Auth0Options } from './auth0-options';

@NgModule({
  declarations: [],
  imports: [
    NgOidcClientModule,
    CommonModule
  ],
  providers: [AuthGuard]
})
export class Auth0OidcModule {
  static forRoot(auth0_options: Auth0Options): ModuleWithProviders {
    return {
      ngModule: Auth0OidcModule,
      providers: [
        { provide: OIDC_CONFIG, useValue: auth0Configurator(auth0_options) },
        AuthGuard
      ]
    };
  }
}
