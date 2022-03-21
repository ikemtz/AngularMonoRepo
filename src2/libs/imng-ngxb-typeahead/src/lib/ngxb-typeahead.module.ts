import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngTypeaheadDirective } from './type-ahead.directive';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    TypeaheadModule.forRoot()],
  declarations: [ImngTypeaheadDirective],
  exports: [ImngTypeaheadDirective]
})
export class ImngNgxbTypeaheadModule { }
