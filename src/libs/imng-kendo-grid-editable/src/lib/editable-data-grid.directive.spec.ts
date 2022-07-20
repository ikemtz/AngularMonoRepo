import { ImngEditableDataGridDirective } from './editable-data-grid.directive';
import { of } from 'rxjs';
import { dir } from 'console';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { readFirst } from 'imng-ngrx-utils/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ChangeDetectorRef } from '@angular/core';
import { IdType } from 'imng-nrsrx-client-utils';

const gridComponent = {
  edit: of({}),
  cancel: of({}),
  save: of({}),
  remove: of({}),
  add: of({}),
  sortChange: of({}),
} as unknown as GridComponent;
export const formGroupFac = () =>
  new UntypedFormGroup({
    id: new UntypedFormControl('🐂🤏'),
    test: new UntypedFormControl('👍'),
  });

describe('ImngEditableDataGridDirective', () => {
  it('should create an instance', () => {
    const changeDetectorRef = {} as ChangeDetectorRef;
    const directive = new ImngEditableDataGridDirective(
      gridComponent,
      changeDetectorRef
    );
    dir();
    expect(directive).toBeTruthy();
    directive.ngOnInit();
  });

  it('should destroy an instance', () => {
    const changeDetectorRef = {} as ChangeDetectorRef;
    const directive = new ImngEditableDataGridDirective(
      gridComponent,
      changeDetectorRef
    );
    expect(directive).toBeTruthy();
    directive.ngOnInit();
    directive.ngOnDestroy();
  });

  it('should set sorting properly', async () => {
    const changeDetectorRef = {} as ChangeDetectorRef;
    const directive = new ImngEditableDataGridDirective(
      gridComponent,
      changeDetectorRef
    );
    expect(directive).toBeTruthy();
    expect(directive.gridDataEntryHelper).toBeFalsy();
    directive.ngOnInit();
    directive.gridDataEntryHelper = new GridDataEntryHelper<{ id?: IdType; }>(formGroupFac, [
      { id: 'A💩' as IdType },
      { id: 'B🐂' as IdType },
      { id: 'C🥜' as IdType },
    ]);
    expect(
      await readFirst(directive.gridDataEntryHelper.sortDescriptors$)
    ).toBeTruthy();
    expect(directive.gridComponent.sort).toBeTruthy();
    directive.ngOnDestroy();
  });
});
