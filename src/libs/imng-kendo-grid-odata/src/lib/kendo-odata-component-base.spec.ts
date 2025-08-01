import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoODataBasedComponent } from './kendo-odata-component-base';
import {
  ODataGridMockFacade,
  createODataGridMockFacade,
} from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
} from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';

describe('KendoODataBasedComponent', () => {
  let component: KendoODataGridTestComponent;
  let fixture: ComponentFixture<KendoODataGridTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KendoODataGridTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoODataGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.router).toBeFalsy();
  });

  it('should export to Excel', async () => {
    const data = await readFirst(component.excelData());
    expect(data).toStrictEqual({ data: [{ id: 'apples' }], total: 0 });
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
  });

  it('should reload', async () => {
    component.reloadEntities();
    expect(component.facade.reloadEntities).toHaveBeenCalledTimes(1);
  });

  it('should serialize/deserialize odataState filters correctly', () => {
    const tempDate = new Date();
    const serializedResult = component.serializeODataState({
      filter: {
        logic: 'and',
        filters: [{ field: 'xyzDate', operator: 'eq', value: tempDate }],
      },
    });
    const deserializedResult =
      component.deserializeODataState(serializedResult);
    expect(tempDate).toEqual(
      (deserializedResult.filter.filters[0] as FilterDescriptor).value,
    );
  });

  it('should limit odataState sort parameters', () => {
    const odataState: ODataState = {
      sort: [
        { field: 'a', dir: 'asc' },
        { field: 'b', dir: 'asc' },
        { field: 'c', dir: 'asc' },
        { field: 'd', dir: 'asc' },
        { field: 'e', dir: 'asc' },
        { field: 'f', dir: 'asc' },
      ],
    };
    component.facade.loadEntities = jest.fn();
    component.loadEntities(odataState);
    expect(component.facade.loadEntities).toHaveBeenCalledTimes(1);
    expect(component.facade.loadEntities).toHaveBeenCalledWith({
      sort: [
        { field: 'a', dir: 'asc' },
        { field: 'b', dir: 'asc' },
        { field: 'c', dir: 'asc' },
        { field: 'd', dir: 'asc' },
        { field: 'e', dir: 'asc' },
      ],
    });
  });

  it('should handle dataStateChange', async () => {
    component.dataStateChange({});
    expect(component.facade.loadEntities).toHaveBeenCalledTimes(2);
  });

  it('should serialize/deserialize odataState correctly', () => {
    const serializedResult = component.serializeODataState({});
    const deserializedResult =
      component.deserializeODataState(serializedResult);
    expect(deserializedResult).toStrictEqual({});
  });

  it('should normalizeFilters CompositeFilter', () => {
    const filter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [
        { field: 'Date', operator: 'eq', value: '1/1/2022' },
        {
          field: 'DateUtc',
          operator: 'eq',
          value: '1/1/2022',
        },
        {
          field: 'BeginDate',
          operator: 'eq',
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
});

const initialGridState: ODataState = {
  selectors: ['x', 'y', 'z'],
  sort: [{ field: 'x', dir: 'desc' }],
  filter: { logic: 'and', filters: [{ field: 'x', operator: 'eq', value: 1 }] },
};
@Component({
    selector: 'imng-test-component',
    template: '<h1></h1>',
    standalone: false
})
export class KendoODataGridTestComponent extends KendoODataBasedComponent<
  object,
  ODataGridMockFacade
> {
  props = {};
  constructor() {
    super(createODataGridMockFacade(), initialGridState);
  }
}
