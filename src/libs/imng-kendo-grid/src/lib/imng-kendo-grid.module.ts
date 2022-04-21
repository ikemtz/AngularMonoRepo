import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ImngGridHeaderComponent } from './grid-header-component/grid-header.component';
import { ImngGridChildColumnTemplateComponent } from './kendo-child-column-component/kendo-child-column-template.component';
import { ImngKendoCopyComponent } from './kendo-copy-component/kendo-copy.component';

@NgModule({
  declarations: [ImngGridHeaderComponent, ImngGridChildColumnTemplateComponent, ImngKendoCopyComponent],
  imports: [CommonModule, GridModule],
  exports: [ImngGridHeaderComponent, ImngGridChildColumnTemplateComponent, ImngKendoCopyComponent],
})
export class ImngKendoGridModule { }
