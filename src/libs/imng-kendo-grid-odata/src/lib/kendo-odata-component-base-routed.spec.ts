import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, inject } from '@angular/core';
import { KendoODataBasedComponent } from './kendo-odata-component-base';
import {
  ODataGridMockFacade,
  createODataGridMockFacade,
} from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import { ODataState } from 'imng-kendo-odata';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('KendoODataBasedComponentRouted', () => {
  let component: KendoODataGridTestComponent;
  let fixture: ComponentFixture<KendoODataGridTestComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [KendoODataGridTestComponent],
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
    fixture = TestBed.createComponent(KendoODataGridTestComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledTimes(1);
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
    expect(data).toStrictEqual({
      data: [
        {
          id: 'apples',
        },
      ],
      total: 0,
    });
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
    expect(router.navigate).toHaveBeenCalledTimes(2);
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
  standalone: false,
})
export class KendoODataGridTestComponent extends KendoODataBasedComponent<
  object,
  ODataGridMockFacade
> {
  override readonly router: Router;

  props = {};
  constructor() {
    const router = inject(Router);

    super(createODataGridMockFacade(), initialGridState, router);

    this.router = router;
  }
}
