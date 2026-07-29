/* eslint-disable @angular-eslint/prefer-inject */
import {
  DataStateChangeEvent,
  SortSettings,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';
import { Input, ChangeDetectorRef, OnDestroy, Component } from '@angular/core';
import {
  process,
  State,
  CompositeFilterDescriptor,
  SortDescriptor,
} from '@progress/kendo-data-query';
import { ICompositeFilter, ODataResult, ODataState } from 'imng-kendo-odata';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscribable } from 'imng-ngrx-utils';
import { KendoGridBaseComponent } from 'imng-kendo-grid';

@Component({
  template: '',
})
export abstract class KendoArrayBasedComponent<PARENT_ENTITY, LISTED_ENTITY>
  extends KendoGridBaseComponent<LISTED_ENTITY>
  implements OnDestroy, Subscribable
{
  /**
   * This will allow you to provide a visual indicator that some of the columns have been hidden.
   */
  public hasHiddenColumns$: Observable<boolean> | undefined;
  @Input() public item?: PARENT_ENTITY;

  private _detail: LISTED_ENTITY[] = [];
  @Input()
  public set detail(value: LISTED_ENTITY[]) {
    this._detail = value || [];
    this.gridData = process(this._detail, this.state as State);
    this.changeDetectorRef?.markForCheck();
  }

  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract readonly props: any; //NOSONAR
  public state: ODataState = {
    skip: 0,
    take: 10,
  };

  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple',
  };

  private _gridData: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[] = [];
  public gridData$ = new BehaviorSubject<
    ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]
  >({ data: [], total: 0 });
  public get gridData(): ODataResult<LISTED_ENTITY> | LISTED_ENTITY[] {
    return this._gridData;
  }
  public set gridData(value: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]) {
    this._gridData = value;
    this.gridData$.next(value);
    this.markForCheck();
  }

  constructor(
    public readonly changeDetectorRef: ChangeDetectorRef | null = null, //NOSONAR
  ) {
    super();
  }

  public readonly markForCheck = (): void =>
    this.changeDetectorRef?.markForCheck();

  public dataStateChange(state: DataStateChangeEvent | ODataState): void {
    this.state = state as ODataState;
    this.gridData = process(this._detail, this.state as State);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public pageChange(t: PageChangeEvent): void {
    //NOSONAR
    //This is intentional
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public filterChange(t: CompositeFilterDescriptor | ICompositeFilter): void {
    //NOSONAR
    //This is intentional
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public sortChange(t: SortDescriptor[]): void {
    //NOSONAR
    //This is intentional
  }
}
