import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'imng-prime-search-caption',
  templateUrl: './search-caption.component.html',
  styleUrls: ['./search-caption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCaptionComponent {
  @Input()
  public dataTable: Table;
}
