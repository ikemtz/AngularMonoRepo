import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IdleEffects } from './+state/idle.effects';
import { IdleFacade } from './+state/idle.facade';
import { idleFeature } from './+state/idle.reducer';
import { IdleConfig, IDLE_CONFIG } from './idle-config';
import { IdleWarningComponent } from './idle-warning/idle-warning.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(idleFeature),
    EffectsModule.forFeature([IdleEffects]),
    DialogModule,
    ButtonsModule,
  ],
  declarations: [IdleWarningComponent],
  exports: [IdleWarningComponent],
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
