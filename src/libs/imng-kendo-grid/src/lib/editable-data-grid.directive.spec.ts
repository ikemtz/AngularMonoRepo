import { ImngEditableDataGridDirective } from './editable-data-grid.directive';
import { of } from 'rxjs';
import { dir } from 'console';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { FormGroup, FormControl } from '@angular/forms';
import { readFirst } from 'imng-ngrx-utils/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ChangeDetectorRef } from '@angular/core';

const gridComponent = {
  edit: of({}),
  cancel: of({}),
  save: of({}),
  remove: of({}),
  add: of({}),
  sortChange: of({}),
} as unknown as GridComponent;
export const formGroupFac = () =>
  new FormGroup({
    id: new FormControl('🐂🤏'),
    test: new FormControl('👍'),
  });

describe('ImngEditableDataGridDirective', () => {
  it('should create an instance', () => {
    const changeDetectorRef = {} as ChangeDetectorRef;
    const directive = new ImngEditableDataGridDirective(gridComponent, changeDetectorRef);
    dir();
    expect(directive).toBeTruthy();
    directive.ngOnInit();
  });

  it('should destroy an instance', () => {
    const changeDetectorRef = {} as ChangeDetectorRef;
    const directive = new ImngEditableDataGridDirective(gridComponent, changeDetectorRef);
    expect(directive).toBeTruthy();
    directive.ngOnInit();
    directive.ngOnDestroy();
  });

  it('should set sorting properly', async done => {
    try {
      const changeDetectorRef = {} as ChangeDetectorRef;
      const directive = new ImngEditableDataGridDirective(gridComponent, changeDetectorRef);
      expect(directive).toBeTruthy();
      expect(directive.gridDataEntryHelper).toBeFalsy();
      directive.ngOnInit();
      directive.gridDataEntryHelper = new GridDataEntryHelper(formGroupFac, [
        { id: 'A💩' },
        { id: 'B🐂' },
        { id: 'C🥜' },
      ]);
      expect(await readFirst(directive.gridDataEntryHelper.sortDescriptors$)).toBeTruthy();
      expect(directive.gridComponent.sort).toBeTruthy();
      directive.ngOnDestroy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
