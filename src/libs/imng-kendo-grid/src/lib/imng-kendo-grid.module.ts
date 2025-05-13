import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngGridHeaderComponent } from './grid-header-component/grid-header.component';
import { ImngGridChildColumnTemplateComponent } from './kendo-child-column-component/kendo-child-column-template.component';
import { ImngKendoCopyComponent } from './kendo-copy-component/kendo-copy.component';

@NgModule({
  declarations: [ImngGridChildColumnTemplateComponent, ImngKendoCopyComponent],
  imports: [CommonModule, ImngGridHeaderComponent],
  exports: [
    ImngGridHeaderComponent,
    ImngGridChildColumnTemplateComponent,
    ImngKendoCopyComponent,
  ],
})
export class ImngKendoGridModule {}
