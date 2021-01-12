import { DataStateChangeEvent, SortSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Input, Directive, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { process, State, CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { ODataResult } from 'imng-kendo-odata';
import { BehaviorSubject, Subscription } from 'rxjs';

@Directive()
export abstract class KendoArrayBaseDirective<PARENT_ENTITY, LISTED_ENTITY> implements OnDestroy {

  public readonly subscriptions: Subscription[] = [];

  @Input() public item?: PARENT_ENTITY;

  private _detail: LISTED_ENTITY[];
  @Input()
  public set detail(value: LISTED_ENTITY[]) {
    this._detail = value || [];
    this.gridData = process(this._detail, this.state);
  }

  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  public gridData$ = new BehaviorSubject<ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]>({ data: [], total: 0 });
  public get gridData(): ODataResult<LISTED_ENTITY> | LISTED_ENTITY[] {
    return this._gridData;
  }
  public set gridData(value: ODataResult<LISTED_ENTITY> | LISTED_ENTITY[]) {
    this._gridData = value;
    this.gridData$.next(value);
    this.markForCheck();
  }

  constructor(public readonly changeDetectorRef: ChangeDetectorRef = null) { }

  public readonly markForCheck = (): void => this.changeDetectorRef?.markForCheck();

  public dataStateChange(state: DataStateChangeEvent | State): void {
    this.state = state;
    this.gridData = process(this._detail, this.state);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public pageChange(t: PageChangeEvent): void { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public filterChange(t: CompositeFilterDescriptor): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public sortChange(t: SortDescriptor[]): void { }

  public ngOnDestroy(): void {
    const unsub = (t: Subscription): void => t?.unsubscribe();
    this.subscriptions.forEach(unsub);
  }
}
