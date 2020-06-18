import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSignalr from './+state/signalr.reducer';
import { SignalrEffects } from './+state/signalr.effects';
import { SignalrFacade } from './+state/signalr.facade';
import { ISignalrConfiguration, SIGNALR_CONFIG } from './models/signalr.configuration';
import { HubConnectionInjectorService } from './services/hub-connection-injector.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromSignalr.SIGNALR_FEATURE_KEY, fromSignalr.reducer),
    EffectsModule.forFeature([SignalrEffects]),
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
