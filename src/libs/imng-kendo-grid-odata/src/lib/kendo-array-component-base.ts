import { DataStateChangeEvent, SortSettings } from '@progress/kendo-angular-grid';
import { Input, OnInit, Directive } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { ODataResult } from 'imng-kendo-odata';

@Directive()
export abstract class KendoArrayComponentBase<PARENT_ENTITY, LISTED_ENTITY> implements OnInit {
  @Input() public item?: PARENT_ENTITY;
  @Input() public detail: LISTED_ENTITY[];
  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  public abstract readonly props: any;
  public state: State = {
    skip: 0,
    take: 10,
  };

  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple',
  };

  public gridData: ODataResult<LISTED_ENTITY>;

  ngOnInit(): void {
    if (this.detail) {
      this.gridData = process(this.detail, this.state);
    }
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.detail, this.state);
  }
}
