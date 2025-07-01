import { ImngEditableDataGridDirective } from './editable-data-grid.directive';
import { of } from 'rxjs';
import { dir } from 'console';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { FormGroup, FormControl } from '@angular/forms';
import { readFirst } from 'imng-ngrx-utils/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import { IdType } from 'imng-nrsrx-client-utils';
import { TestBed, waitForAsync } from '@angular/core/testing';

export const formGroupFac = () =>
  new FormGroup({
    id: new FormControl<string>('🐂🤏'),
    test: new FormControl<string>('👍'),
  });

describe('ImngEditableDataGridDirective', () => {
  let directive: ImngEditableDataGridDirective;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        ImngEditableDataGridDirective,
        {
          provide: GridComponent,
          useValue: {
            edit: of({}),
            cancel: of({}),
            save: of({}),
            remove: of({}),
            add: of({}),
            sortChange: of({}),
          },
        },
      ],
      schemas: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    directive = TestBed.inject(ImngEditableDataGridDirective);
  });
  it('should create an instance', () => {
    dir();
    expect(directive).toBeTruthy();
    directive.ngOnInit();
  });

  it('should destroy an instance', () => {
    expect(directive).toBeTruthy();
    directive.ngOnInit();
    directive.ngOnDestroy();
  });

  it('should set sorting properly', async () => {
    expect(directive).toBeTruthy();
    expect(directive.gridDataEntryHelper).toBeFalsy();
    directive.ngOnInit();
    directive.gridDataEntryHelper = new GridDataEntryHelper<{ id?: IdType }>(
      formGroupFac,
      [
        { id: 'A💩' as IdType },
        { id: 'B🐂' as IdType },
        { id: 'C🥜' as IdType },
      ],
    );
    expect(
      await readFirst(directive.gridDataEntryHelper.sortDescriptors$),
    ).toBeTruthy();
    expect(directive.gridComponent.sort).toBeTruthy();
    directive.ngOnDestroy();
  });
});
