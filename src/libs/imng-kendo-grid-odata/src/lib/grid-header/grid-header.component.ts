import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'imng-kendo-odata-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss'],
})
export class ImngGridHeaderComponent {
  @Input()
  public entityName: string;
  @Output()
  public addItemClicked = new EventEmitter();
  @Output()
  public clearFiltersClicked = new EventEmitter();
  @Output()
  public reloadEntitiesClicked = new EventEmitter();
}
