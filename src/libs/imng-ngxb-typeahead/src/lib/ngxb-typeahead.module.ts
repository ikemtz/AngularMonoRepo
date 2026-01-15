import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_TYPE_AHEAD } from './type-ahead.directive';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [CommonModule, TypeaheadModule.forRoot(), IMNG_TYPE_AHEAD],
  exports: [IMNG_TYPE_AHEAD],
})
export class ImngNgxbTypeaheadModule {}
