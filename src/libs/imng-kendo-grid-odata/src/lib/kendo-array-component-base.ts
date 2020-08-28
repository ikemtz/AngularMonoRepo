import { DataStateChangeEvent, SortSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Input, OnInit, Directive, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { process, State, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ODataResult } from 'imng-kendo-odata';
import { Subscription } from 'rxjs';

@Directive()
export abstract class KendoArrayComponentBase<PARENT_ENTITY, LISTED_ENTITY> implements AfterViewInit {

  public readonly subscriptions: Subscription[] = [];
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

  private _gridData: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[];
  get gridData(): ODataResult<LISTED_ENTITY> | LISTED_ENTITY[] {
    return this._gridData;
  }
  set gridData(value: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]) {
    this._gridData = name;
    this.changeDetectorRef?.markForCheck();
  }

  constructor(public readonly changeDetectorRef: ChangeDetectorRef = null) { }

  public ngAfterViewInit(): void {
    if (this.detail) {
      this.gridData = process(this.detail, this.state);
    }
  }

  public dataStateChange(state: DataStateChangeEvent | State): void {
    this.state = state;
    this.gridData = process(this.detail, this.state);
  }

  public pageChange(t: PageChangeEvent): void {
  }

  public filterChange(t: CompositeFilterDescriptor): void {
  }
}
