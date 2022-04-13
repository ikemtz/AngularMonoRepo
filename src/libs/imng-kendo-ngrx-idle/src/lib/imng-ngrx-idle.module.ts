import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { idleFeature } from './+state/idle.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IdleEffects } from './+state/idle.effects';
import { IdleConfig, IDLE_CONFIG } from './idle-config';
import { IdleFacade } from './+state/idle.facade';
import { IdleWarningComponent } from './idle-warning/idle-warning.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(idleFeature),
    EffectsModule.forFeature([IdleEffects]),
    DialogModule, ButtonsModule
  ],
  declarations: [IdleWarningComponent],
  exports: [IdleWarningComponent]
})
export class ImngNgrxIdleModule {
  static forRoot(idleConfig: IdleConfig): ModuleWithProviders<ImngNgrxIdleModule> {
    return {
      ngModule: ImngNgrxIdleModule,
      providers: [
        { provide: IDLE_CONFIG, useValue: idleConfig },
        IdleFacade
      ]
    };
  }
}
