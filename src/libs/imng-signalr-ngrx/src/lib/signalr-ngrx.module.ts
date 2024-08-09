import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ImngOidcClientModule } from 'imng-oidc-client';
import { SignalrEffects } from './+state/signalr.effects';
import { SignalrFacade } from './+state/signalr.facade';
import { signalrFeature } from './+state/signalr.reducer';
import {
  ISignalrConfiguration,
  SIGNALR_CONFIG,
} from './models/signalr.configuration';
import { HubConnectionInjectorService } from './services/hub-connection-injector.service';

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
    signalrConfiguration: ISignalrConfiguration,
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
