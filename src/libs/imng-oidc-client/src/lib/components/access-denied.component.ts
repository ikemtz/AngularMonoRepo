import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'imng-access-denied',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<div class="p-5 m-5 text-danger">Access denied.</div>',
})
export class IMNG_ACCESS_DENIED {}
