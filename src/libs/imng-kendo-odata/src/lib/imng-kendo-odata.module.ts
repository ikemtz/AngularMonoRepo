import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ODataService } from './odata.service';

@NgModule({
  imports: [CommonModule],
  providers: [ODataService],
})
export class KendoODataModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: KendoODataModule,
      providers: [ODataService],
    };
  }
}
