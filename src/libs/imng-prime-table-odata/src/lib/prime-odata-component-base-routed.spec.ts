import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import {
  ODataTableMockFacade,
  createODataGridMockFacade,
} from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import { ODataState } from 'imng-kendo-odata';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('KendoODataBasedComponentRouted', () => {
  let component: PrimeODataTableTestComponent;
  let fixture: ComponentFixture<PrimeODataTableTestComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [PrimeODataTableTestComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            routerState: {
              snapshot: {
                root: {
                  queryParams: {
                    odataState:
                      'eyJ0YWtlIjoyMCwic2tpcCI6MCwic29ydCI6W3siZmllbGQiOiJpZCIsImRpciI6ImFzYyJ9XX0=',
                  },
                },
              },
            },
            navigate: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeODataTableTestComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(router.navigate).toBeCalledTimes(1);
    expect(router.navigate).toHaveBeenNthCalledWith(1, [], {
      queryParams: {
        odataState:
          'eyJ0YWtlIjoyMCwic2tpcCI6MCwic29ydCI6W3siZmllbGQiOiJpZCIsImRpciI6ImFzYyJ9XX0=',
      },
      queryParamsHandling: 'merge',
      relativeTo: undefined,
      skipLocationChange: false,
    });
  });

  it('should export to Excel', async () => {
    const data = await readFirst(component.excelData());
    expect(data).toMatchSnapshot();
  });

  it('should reset', async () => {
    component.gridDataState = {
      ...component.gridDataState,
      filter: {
        logic: 'and',
        filters: [{ field: 'y', operator: 'contains', value: 56 }],
      },
    };
    component.resetFilters();
    expect(component.gridDataState).toMatchSnapshot();
    expect(router.navigate).toBeCalledTimes(2);
    expect(router.navigate).toHaveBeenNthCalledWith(2, [], {
      queryParams: {
        odataState:
          'eyJ0YWtlIjoyMCwic2tpcCI6MCwic29ydCI6W3siZmllbGQiOiJpZCIsImRpciI6ImFzYyJ9XSwiZmlsdGVyIjp7ImxvZ2ljIjoiYW5kIiwiZmlsdGVycyI6W3siZmllbGQiOiJ4Iiwib3BlcmF0b3IiOiJlcSIsInZhbHVlIjoxfV19fQ==',
      },
      queryParamsHandling: 'merge',
      relativeTo: undefined,
      skipLocationChange: false,
    });
  });
});
const initialGridState: ODataState = {
  selectors: ['x', 'y', 'z'],
  sort: [{ field: 'x', dir: 'desc' }],
  skip: 20,
  filter: { logic: 'and', filters: [{ field: 'x', operator: 'eq', value: 1 }] },
};
@Component({
  selector: 'imng-test-component',
  template: '<h1>{{ hasHiddenColumns$ | async }}</h1>',
})
// eslint-disable-next-line @typescript-eslint/ban-types
export class PrimeODataTableTestComponent extends ImngPrimeODataTableBaseComponent<
object,
ODataTableMockFacade
> {
  props = {};
  constructor(override readonly router: Router) {
    super(createODataGridMockFacade(), initialGridState, router);
  }
}
