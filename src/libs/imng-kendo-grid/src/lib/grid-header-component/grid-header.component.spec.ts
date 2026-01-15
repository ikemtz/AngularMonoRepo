import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ColumnInfoService,
  ContextService,
  ExcelService,
  GridComponent,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  PDFCommandDirective,
  PDFService,
} from '@progress/kendo-angular-grid';
import { of } from 'rxjs';
import { IMNG_KENDO_GRID_HEADER } from './grid-header.component';
import { KENDO_BUTTON, KENDO_BUTTONS } from '@progress/kendo-angular-buttons';

describe('ImngGridHeaderComponent', () => {
  let component: IMNG_KENDO_GRID_HEADER;
  let fixture: ComponentFixture<IMNG_KENDO_GRID_HEADER>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMNG_KENDO_GRID_HEADER, PDFCommandDirective],
      providers: [
        {
          provide: GridComponent,
          useValue: {},
        },
        {
          provide: PDFService,
          useValue: {},
        },
        {
          provide: ExcelService,
          useValue: {},
        },
        {
          provide: ColumnInfoService,
          useValue: {},
        },
        {
          provide: ContextService,
          useValue: {
            localization: {
              get: jest.fn(),
              rtl: true,
              changes: of({ rtl: true }),
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMNG_KENDO_GRID_HEADER);
    component = fixture.componentInstance;
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
