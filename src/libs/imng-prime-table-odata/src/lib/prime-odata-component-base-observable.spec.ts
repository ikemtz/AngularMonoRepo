import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import {
  ODataTableMockFacade,
  createODataGridMockFacade,
} from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  CompositeFilter,
  FilterOperators,
  ODataQuery,
} from 'imng-odata-client';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FilterMetadata } from 'primeng/api';

describe('PrimeODataBasedComponent Observable State', () => {
  let component: PrimeODataTableTestComponent;
  let fixture: ComponentFixture<PrimeODataTableTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeODataTableTestComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jest.fn(), routerState: { root: {} } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeODataTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.router).toBeTruthy();
  });

  it('should export to Excel', async () => {
    const data = await readFirst(component.excelData());
    expect(data).toMatchSnapshot();
  });

  it('should reset', async () => {
    component.tableState = {
      ...component.tableState,
      filters: {
        y: { operator: 'contains', value: 56 },
      },
    };
    component.resetFilters();
    expect(component.tableState).toMatchSnapshot();
  });

  it('should reload', async () => {
    component.reloadEntities();
    expect(component.facade.reloadEntities).toBeCalledTimes(1);
  });

  it('should handle dataStateChange', async () => {
    component.dataStateChange({});
    expect(component.facade.loadEntities).toBeCalledTimes(2);
  });

  it('should handle getExportFileName', async () => {
    const result = component.getExportFileName('unit-test');
    expect(result).toHaveLength(28);
  });

  it('should handle getRelatedValue', () => {
    const result = component.getRelatedValue(
      { subItem: { name: 'unit-test' } },
      'subItem',
      'name',
    );
    expect(result).toBe('unit-test');
  });

  it('should handle getRelatedField', () => {
    const result = component.getRelatedField('subItem', 'name');
    expect(result).toBe('subItem.name');
  });

  it('should handle getEnumText with matching result', () => {
    const data = [
      { name: 'val1', displayText: 'value 1' },
      { name: 'val2', displayText: 'value 2' },
    ];
    const result = component.getEnumText(data, 'val1');
    expect(result).toBe('value 1');
  });

  it('should handle getEnumText with no result', () => {
    const data = [
      { name: 'val1', displayText: 'value 1' },
      { name: 'val2', displayText: 'value 2' },
    ];
    const result = component.getEnumText(data, 'val3');
    expect(result).toBeUndefined();
  });

  it('should normalizeFilters CompositeFilter', () => {
    const filter: CompositeFilter = {
      logic: 'and',
      filters: [
        { field: 'Date', operator: FilterOperators.equals, value: '1/1/2022' },
        {
          field: 'DateUtc',
          operator: FilterOperators.equals,
          value: '1/1/2022',
        },
        {
          field: 'BeginDate',
          operator: FilterOperators.equals,
          value: '1/1/2022',
        },
      ],
    };
    component.normalizeFilters(filter);
    expect(filter).toMatchSnapshot({
      filters: [
        { value: expect.any(Date) },
        { value: expect.any(Date) },
        { value: expect.any(Date) },
      ],
    });
  });

  it('should serialize/deserialize odataQuery filters correctly', () => {
    const tempDate = new Date();
    const serializedResult = component.serializeTableState({
      filters: {
        xyzDate: {
          operator: 'eq',
          value: tempDate,
        },
      },
    });
    const deserializedResult =
      component.deserializeTableState(serializedResult);
    expect(tempDate).toEqual(
      new Date((deserializedResult.filters['xyzDate'] as FilterMetadata).value),
    );
  });

  it('should limit odataQuery sort parameters', () => {
    const odataQuery: ODataQuery = {
      orderBy: [
        { field: 'a', dir: 'asc' },
        { field: 'b', dir: 'asc' },
        { field: 'c', dir: 'asc' },
        { field: 'd', dir: 'asc' },
        { field: 'e', dir: 'asc' },
        { field: 'f', dir: 'asc' },
      ],
    };
    component.facade.loadEntities = jest.fn();
    component.loadEntities(odataQuery);
    expect(component.facade.loadEntities).toBeCalledTimes(1);
    expect(component.facade.loadEntities).toBeCalledWith({
      orderBy: [
        { field: 'a', dir: 'asc' },
        { field: 'b', dir: 'asc' },
        { field: 'c', dir: 'asc' },
        { field: 'd', dir: 'asc' },
        { field: 'e', dir: 'asc' },
        { field: 'f', dir: 'asc' },
      ],
    });
  });

  it('should serialize/deserialize odataQuery correctly', () => {
    const serializedResult = component.serializeTableState({});
    const deserializedResult =
      component.deserializeTableState(serializedResult);
    expect(deserializedResult).toStrictEqual({});
  });
});

const initialGridState: ODataQuery = {
  select: ['x', 'y', 'z'],
  orderBy: [{ field: 'x', dir: 'desc' }],
  filter: {
    logic: 'and',
    filters: [{ field: 'x', operator: FilterOperators.equals, value: 1 }],
  },
};
@Component({
  selector: 'imng-test-component',
  template: '<h1></h1>',
})
// eslint-disable-next-line @typescript-eslint/ban-types
class PrimeODataTableTestComponent extends ImngPrimeODataTableBaseComponent<
  object,
  ODataTableMockFacade
> {
  props = {};
  constructor(router: Router) {
    super(createODataGridMockFacade(), of(initialGridState), router, of(true));
  }
}
