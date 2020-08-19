import { DataStateChangeEvent, SortSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Input, OnInit, Directive } from '@angular/core';
import { process, State, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ODataResult } from 'imng-kendo-odata';
import { Subject } from 'rxjs';

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

  public gridData$ = new Subject<ODataResult<LISTED_ENTITY>>();

  public ngOnInit(): void {
    if (this.detail) {
      this.gridData$.next(process(this.detail, this.state));
    }
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData$.next(process(this.detail, this.state));
  }

  public pageChange(t: PageChangeEvent): void {
  }

  public filterChange(t: CompositeFilterDescriptor): void {
  }
}
