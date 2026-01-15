import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IdleEffects } from './+state/idle.effects';
import { IdleFacade } from './+state/idle.facade';
import { idleFeature } from './+state/idle.reducer';
import { IdleConfig, IDLE_CONFIG } from './idle-config';
import { IMNG_KENDO_IDLE_WARNING } from './idle-warning/idle-warning.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(idleFeature),
    EffectsModule.forFeature([IdleEffects]),
    IMNG_KENDO_IDLE_WARNING,
  ],
  exports: [IMNG_KENDO_IDLE_WARNING],
})
export class ImngNgrxIdleModule {
  static forRoot(
    idleConfig: IdleConfig,
  ): ModuleWithProviders<ImngNgrxIdleModule> {
    return {
      ngModule: ImngNgrxIdleModule,
      providers: [{ provide: IDLE_CONFIG, useValue: idleConfig }, IdleFacade],
    };
  }
}
