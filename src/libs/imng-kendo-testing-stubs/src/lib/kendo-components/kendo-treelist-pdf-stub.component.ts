import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input, 
} from '@angular/core';
import { Margin } from '../interfaces/margin';
import { PaperSize } from '../type';

@Component({
  selector: 'kendo-treelist-pdf',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TREELIST_PDF_STUB {//NOSONAR
  @Input() public allPages?: boolean;
  @Input() public author?: string;
  @Input() public autoPrint? = false;
  @Input() public avoidLinks?: string | boolean;
  @Input() public creator?: string = 'Kendo UI PDF Generator';
  @Input() public date? = new Date();
  @Input() public delay? = 0;
  @Input() public fileName? = 'export.pdf';
  @Input() public forcePageBreak?: string;
  @Input() public forceProxy?: boolean;
  @Input() public imageResolution?: number;
  @Input() public keepTogether?: string;
  @Input() public keywords?: string;
  @Input() public landscape? = false;
  @Input() public margin?: string | number | Margin;
  @Input() public paperSize?: PaperSize = 'auto';
  @Input() public producer?: string;
  @Input() public proxyData?: { [key: string]: string };
  @Input() public proxyTarget?: string = '_self';
  @Input() public proxyURL?: string;
  @Input() public repeatHeaders?: boolean;
  @Input() public scale? = 1;
  @Input() public subject?: string;
  @Input() public title?: string;
}
