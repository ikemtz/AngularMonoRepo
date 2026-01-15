import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AdaptiveGridService,
  ColumnComponent,
  ContextService,
  FilterService,
} from '@progress/kendo-angular-grid';
import { IMNG_KENDO_GRID_UUID_FILTER } from './uuid-filter.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UuidFilterComponent', () => {
  let component: IMNG_KENDO_GRID_UUID_FILTER;
  let fixture: ComponentFixture<IMNG_KENDO_GRID_UUID_FILTER>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, IMNG_KENDO_GRID_UUID_FILTER],
      providers: [
        { provide: FilterService, useValue: {} },
        { provide: ColumnComponent, useValue: {} },
        { provide: AdaptiveGridService, useValue: {} },
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
