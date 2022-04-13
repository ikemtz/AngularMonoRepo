import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { signalrFeature } from './+state/signalr.reducer';
import { SignalrEffects } from './+state/signalr.effects';
import { SignalrFacade } from './+state/signalr.facade';
import {
  ISignalrConfiguration,
  SIGNALR_CONFIG,
} from './models/signalr.configuration';
import { HubConnectionInjectorService } from './services/hub-connection-injector.service';
import { ImngOidcClientModule } from 'imng-oidc-client';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(signalrFeature),
    EffectsModule.forFeature([SignalrEffects]),
    ImngOidcClientModule,
  ],
  providers: [HubConnectionInjectorService, SignalrFacade],
})
export class ImngSignalrNgrxModule {
  static forRoot(
    signalrConfiguration: ISignalrConfiguration
  ): ModuleWithProviders<ImngSignalrNgrxModule> {
    return {
      ngModule: ImngSignalrNgrxModule,
      providers: [
        {
          provide: SIGNALR_CONFIG,
          multi: false,
          useValue: signalrConfiguration,
        },
      ],
    };
  }
}
