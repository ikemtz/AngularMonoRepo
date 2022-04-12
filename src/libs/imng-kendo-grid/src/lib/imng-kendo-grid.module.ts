import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ImngGridHeaderComponent } from './grid-header-component/grid-header.component';
import { ImngGridChildColumnTemplateComponent } from './kendo-child-column-component/kendo-child-column-template.component';

@NgModule({
  declarations: [ImngGridHeaderComponent, ImngGridChildColumnTemplateComponent],
  imports: [CommonModule, GridModule],
  exports: [ImngGridHeaderComponent, ImngGridChildColumnTemplateComponent],
})
export class ImngKendoGridModule {}
