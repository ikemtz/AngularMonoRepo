import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input, 
} from '@angular/core'; 

@Component({
  selector: 'kendo-treelist-spacer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TREELIST_SPACER_STUB { //NOSONAR
  @Input() public width?: number; 
}
