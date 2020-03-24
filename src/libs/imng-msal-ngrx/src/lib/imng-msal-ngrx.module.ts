import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMsal from './+state/msal.reducer';
import { MsalEffects } from './+state/msal.effects';
import { MsalFacade } from './+state/msal.facade';
import { MsalNgrxService } from './services/imng-msal-ngrx.service';
import { Configuration } from '@azure/msal';
import { MSAL_CONFIG } from '../contstants';
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMsal.MSAL_FEATURE_KEY, fromMsal.reducer),
    EffectsModule.forFeature([MsalEffects]),
  ],
  providers: [MsalFacade, MsalNgrxService],
  declarations: [CallbackComponent],
})
export class ImngMsalNgrxModule {
  static forRoot(config: Configuration): ModuleWithProviders {
    return {
      ngModule: ImngMsalNgrxModule,
      providers: [
        {
          provide: MSAL_CONFIG,
          useValue: config,
        },
        MsalNgrxService,
      ],
    };
  }
}
