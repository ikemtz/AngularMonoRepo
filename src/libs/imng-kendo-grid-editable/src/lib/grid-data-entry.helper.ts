import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, isObservable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  EditEvent,
  CancelEvent,
  SaveEvent,
  RemoveEvent,
  AddEvent,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { IdType } from 'imng-nrsrx-client-utils';
import { Subscriptions } from 'imng-ngrx-utils';

export class GridDataEntryHelper<TENTITY extends { id?: IdType }> {
  private _editedRowIndex: number | undefined;
  private _gridFormGroup: FormGroup | undefined;
  private readonly _gridData$: BehaviorSubject<Array<TENTITY>>;
  public sortDescriptors$ = new BehaviorSubject<SortDescriptor[]>([]);
  public readonly subscriptions: Subscriptions;
  public get gridFormGroup(): FormGroup | undefined {
    return this._gridFormGroup;
  }

  public get gridData$(): Observable<Array<TENTITY>> {
    //NOSONAR
    return this._gridData$.asObservable();
  }

  public get gridData(): Array<TENTITY> {
    return this._gridData;
  }

  public set gridData(value: Array<TENTITY>) {
    if (value) {
      this._gridData = [...value];
      this._gridData$.next(this._gridData);
    }
  }

  public get isInEditMode(): boolean {
    return !!this._gridFormGroup;
  }

  public get isValid(): boolean {
    return this.gridValidationLogic(this.gridData);
  }

  public get isValid$(): Observable<boolean> {
    //NOSONAR
    return this.gridData$.pipe(map((t) => this.gridValidationLogic(t)));
  }
  constructor(
    private readonly formGroupFactory: () => FormGroup,
    private _gridData: TENTITY[] = [],
    private readonly preSaveLogic: (
      entity: TENTITY,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) => Observable<TENTITY> | void = () => {},
  ) {
    this._gridData$ = new BehaviorSubject<Array<TENTITY>>(_gridData);
    this.subscriptions = new Subscriptions();
  }

  public addItems(...items: TENTITY[]): TENTITY[] {
    if (items) {
      this._gridData.push(...items);
      this._gridData$.next(this._gridData);
    }
    return this._gridData;
  }

  public removeItems(...items: TENTITY[]): TENTITY[] {
    if (items) {
      items.forEach((f) => {
        this._gridData = this.gridData.filter((t) => t !== f);
      });
      this._gridData$.next(this._gridData);
    }
    return this._gridData;
  }

  public editHandler(editEvent: EditEvent): void {
    this.closeEditor(editEvent.sender, editEvent.rowIndex);

    this._gridFormGroup = this.formGroupFactory();
    this._gridFormGroup.patchValue(editEvent.dataItem);
    this._editedRowIndex = editEvent.rowIndex;
    editEvent.sender.editRow(editEvent.rowIndex, this._gridFormGroup);
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex = this._editedRowIndex,
  ): void {
    grid.closeRow(rowIndex);
    this._editedRowIndex = undefined;
    this._gridFormGroup = undefined;
  }

  public cancelHandler(cancelEvent: CancelEvent): void {
    this.closeEditor(cancelEvent.sender, cancelEvent.rowIndex);
  }

  public saveHandler(saveEvent: SaveEvent): void {
    const result: TENTITY = saveEvent.formGroup.value;
    const resultPipe = this.preSaveLogic(result);
    if (isObservable(resultPipe)) {
      this.subscriptions.push(
        resultPipe
          .pipe(tap((record) => this.updateRecord(record, saveEvent)))
          .subscribe(),
      );
    } else {
      this.updateRecord(result, saveEvent);
    }
  }
  public updateRecord(record: TENTITY, saveEvent: SaveEvent) {
    const tempGrid: TENTITY[] = this.gridData.map((t) => ({ ...t }));
    if (saveEvent.isNew) {
      record.id = undefined;
      tempGrid.push(record);
    } else {
      tempGrid.splice(saveEvent.rowIndex, 1, record);
    }
    this.gridData = tempGrid;
    this._gridData$.next(this.gridData);
    this.closeEditor(saveEvent.sender, saveEvent.rowIndex);
  }

  public removeHandler(removeEvent: RemoveEvent): void {
    const tempGrid = this.gridData.map((t) => ({ ...t }));
    tempGrid.splice(removeEvent.rowIndex, 1);
    this.gridData = tempGrid;
    this._gridData$.next(this.gridData);
  }

  public sortHandler(sortDescriptors: SortDescriptor[]): void {
    this.sortDescriptors$.next(sortDescriptors);
    this.gridData = orderBy(this.gridData, sortDescriptors);
  }

  public addHandler(addEvent: AddEvent): void {
    this.closeEditor(addEvent.sender);
    this._gridFormGroup = this.formGroupFactory();
    addEvent.sender.addRow(this._gridFormGroup);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public gridValidationLogic(_data: Array<TENTITY>): boolean {
    return this._gridData.length > 0 && !this._gridFormGroup;
  }
}
