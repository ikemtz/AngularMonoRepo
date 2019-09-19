import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngTypeAheadDirective } from './type-ahead.directive';
import { TypeaheadModule, TypeaheadConfig } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [CommonModule,
    TypeaheadModule],
  declarations: [ImngTypeAheadDirective],
  providers: [{
    provide: TypeaheadConfig, useValue: {
      isAnimated: true,
      hideResultsOnBlur: true,
      minLength: 1
    }
  }],
  exports: [ImngTypeAheadDirective]
})
export class ImngNgxbTypeaheadModule { }
