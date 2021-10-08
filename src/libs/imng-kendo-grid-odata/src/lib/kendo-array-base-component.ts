import { DataStateChangeEvent, SortSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Input, ChangeDetectorRef, OnDestroy, Component } from '@angular/core';
import { process, State, CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { ODataResult } from 'imng-kendo-odata';
import { BehaviorSubject } from 'rxjs';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';

// eslint-disable-next-line @angular-eslint/directive-class-suffix
@Component({ template: '' })
export abstract class KendoArrayBasedComponent<PARENT_ENTITY, LISTED_ENTITY> implements OnDestroy, Subscribable {
  public readonly allSubscriptions = Subscriptions.instance;

  @Input() public item?: PARENT_ENTITY;

  private _detail: LISTED_ENTITY[];
  @Input()
  public set detail(value: LISTED_ENTITY[]) {
    this._detail = value || [];
    this.gridData = process(this._detail, this.state);
    this.changeDetectorRef?.markForCheck();
  }

  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract readonly props: any; //NOSONAR
  public state: State = {
    skip: 0,
    take: 10,
  };

  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple',
  };

  private _gridData: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[];
  public gridData$ = new BehaviorSubject<ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]>({ data: [], total: 0 });
  public get gridData(): ODataResult<LISTED_ENTITY> | LISTED_ENTITY[] {
    return this._gridData;
  }
  public set gridData(value: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]) {
    this._gridData = value;
    this.gridData$.next(value);
    this.markForCheck();
  }

  constructor(public readonly changeDetectorRef: ChangeDetectorRef = null) {}

  public readonly markForCheck = (): void => this.changeDetectorRef?.markForCheck();

  public dataStateChange(state: DataStateChangeEvent | State): void {
    this.state = state;
    this.gridData = process(this._detail, this.state);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public pageChange(t: PageChangeEvent): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public filterChange(t: CompositeFilterDescriptor): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public sortChange(t: SortDescriptor[]): void {}

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
