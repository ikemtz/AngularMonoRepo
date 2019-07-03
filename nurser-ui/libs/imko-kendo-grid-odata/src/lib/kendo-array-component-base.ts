import { DataStateChangeEvent, SortSettings } from '@progress/kendo-angular-grid';
import { Input, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { ODataGridDataResult } from './odata-grid-data-result';

export abstract class KendoArrayComponentBase<PARENT_ENTITY, LISTED_ENTITY> implements OnInit {
  @Input() public item?: PARENT_ENTITY;
  @Input() public detail: LISTED_ENTITY[];

  public state: State = {
    skip: 0,
    take: 10
  };

  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple'
  };

  public gridData: ODataGridDataResult<LISTED_ENTITY>;

  ngOnInit(): void {
    this.gridData = process(this.detail, this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.detail, this.state);
  }
}
