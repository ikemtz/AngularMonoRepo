import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ColumnInfoService,
  ContextService,
  ExcelService,
  GridComponent,
  PDFCommandDirective,
  PDFService,
} from '@progress/kendo-angular-grid';
import { of } from 'rxjs';
import { IMNG_KENDO_GRID_HEADER } from './grid-header.component';
import { hasHiddenColumns } from '../kendo-has-hidden-columns';

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
    fixture.componentRef.setInput('hasHiddenColumns$', of(true));
    fixture.changeDetectorRef.markForCheck();
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
    fixture.componentRef.setInput('hideReloadData', true);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const html: string = element.innerHTML;
    expect(html).not.toContain('"imngReloadData"');
  });

  it('should support hideReloadData = false', () => {
    fixture.componentRef.setInput('hideReloadData', false);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const html: string = element.innerHTML;
    expect(html).toContain('"imngReloadData"');
  });

  it('should support hideResetFilters = true', () => {
    fixture.componentRef.setInput('hideResetFilters', true);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const html: string = element.innerHTML;
    expect(html).not.toContain('"imngResetFilters"');
  });

  it('should support hideResetFilters = false', () => {
    fixture.componentRef.setInput('hideResetFilters', false);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const html: string = element.innerHTML;
    expect(html).toContain('"imngResetFilters"');
  });
});
