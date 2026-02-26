import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ColumnChooserComponent,
  KENDO_GRID,
} from '@progress/kendo-angular-grid';
import { BehaviorSubject, of } from 'rxjs';
import { IMNG_KENDO_GRID_ODATA_HEADER } from './grid-odata-header.component';
import {
  IMNG_KENDO_GRID_HEADER_TESTING_STUBS,
  provideGridComponent,
} from 'imng-kendo-testing-stubs';
import {
  KENDO_BUTTON,
  KENDO_SPLITBUTTON,
} from '@progress/kendo-angular-buttons';
import { ODataService } from 'imng-kendo-odata';
import { KENDO_POPUP } from '@progress/kendo-angular-popup';
import { KENDO_PROGRESSBAR } from '@progress/kendo-angular-progressbar';

describe('ImngGridHeaderComponent', () => {
  let component: IMNG_KENDO_GRID_ODATA_HEADER;
  let fixture: ComponentFixture<IMNG_KENDO_GRID_ODATA_HEADER>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMNG_KENDO_GRID_ODATA_HEADER],
      providers: [
        provideGridComponent(),
        {
          provide: ODataService,
          useValue: { fetch: jest.fn(() => of({ data: [], total: 0 })) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(IMNG_KENDO_GRID_ODATA_HEADER, {
        remove: {
          imports: [
            KENDO_BUTTON,
            KENDO_GRID,
            KENDO_POPUP,
            KENDO_PROGRESSBAR,
            KENDO_SPLITBUTTON,
            ColumnChooserComponent,
          ],
        },
        add: {
          imports: [...IMNG_KENDO_GRID_HEADER_TESTING_STUBS],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMNG_KENDO_GRID_ODATA_HEADER);
    component = fixture.componentInstance;
    component.imngODataGrid = {
      odataService: {},
      odataEndpoint: 'testEndpoint',
      loadDataProgression$: new BehaviorSubject(0),
    } as never;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support hiddenColumns = true', () => {
    component.hasHiddenColumns$ = of(true);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toContain('class="text-primary"');
  });
  it('allExports should work', () => {
    component.hasHiddenColumns$ = of(true);
    fixture.detectChanges();
    component.exportOptions.forEach((button) => button.click());
  });

  it('should support hiddenColumns = false', () => {
    component.hasHiddenColumns$ = of(false);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toContain(
      '<kendo-grid-column-chooser name="imngColumnChooser" title="Columns">',
    );
  });

  it('should support hideReloadData = true', () => {
    component.hideReloadData = true;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideReloadData = false', () => {
    component.hideReloadData = false;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideResetFilters = true', () => {
    component.hideResetFilters = true;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideResetFilters = false', () => {
    component.hideResetFilters = false;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });
});
