import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { signalrReducer, SIGNALR_FEATURE_KEY } from './+state/signalr.reducer';
import { SignalrEffects } from './+state/signalr.effects';
import { SignalrFacade } from './+state/signalr.facade';
import { ISignalrConfiguration, SIGNALR_CONFIG } from './models/signalr.configuration';
import { HubConnectionInjectorService } from './services/hub-connection-injector.service';
import { Auth0OidcModule } from 'imng-auth0-oidc';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SIGNALR_FEATURE_KEY, signalrReducer),
    EffectsModule.forFeature([SignalrEffects]),
    Auth0OidcModule
  ],
  providers: [HubConnectionInjectorService, SignalrFacade],
})
export class ImngSignalrNgrxModule {
  static forRoot(signalrConfiguration: ISignalrConfiguration): ModuleWithProviders<ImngSignalrNgrxModule> {
    return {
      ngModule: ImngSignalrNgrxModule,
      providers: [{ provide: SIGNALR_CONFIG, multi: false, useValue: signalrConfiguration }],
    };
  }
}
