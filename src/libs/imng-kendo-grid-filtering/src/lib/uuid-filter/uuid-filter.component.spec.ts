import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent, FilterService } from '@progress/kendo-angular-grid';
import { IMNG_KENDO_GRID_UUID_FILTER } from './uuid-filter.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UuidFilterComponent', () => {
  let component: IMNG_KENDO_GRID_UUID_FILTER;
  let fixture: ComponentFixture<IMNG_KENDO_GRID_UUID_FILTER>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMNG_KENDO_GRID_UUID_FILTER],
      providers: [
        { provide: FilterService, useValue: {} },
        { provide: ColumnComponent, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMNG_KENDO_GRID_UUID_FILTER);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
