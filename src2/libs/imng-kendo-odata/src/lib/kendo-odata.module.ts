import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ODataService } from './odata.service';

@NgModule({
  imports: [CommonModule],
  providers: [ODataService],
})
export class ImngKendoODataModule {
  public static forRoot(): ModuleWithProviders<ImngKendoODataModule> {
    return {
      ngModule: ImngKendoODataModule,
      providers: [ODataService],
    };
  }
}
