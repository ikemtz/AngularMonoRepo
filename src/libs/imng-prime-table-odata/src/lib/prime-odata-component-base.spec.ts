import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import {
  ODataTableMockFacade,
  createODataTableMockFacade,
} from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import { PrimeTableState } from './models/prime-table-state';

describe('PrimeODataBasedComponent', () => {
  let component: PrimeODataTableTestComponent;
  let fixture: ComponentFixture<PrimeODataTableTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeODataTableTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeODataTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.router).toBeFalsy();
  });

  it('should export to Excel', async () => {
    const data = await readFirst(component.excelData());
    expect(data).toMatchSnapshot();
  });

  it('should reset', async () => {
    component.tableState = {
      ...component.tableState,
      filters: {
        y: [{ operator: 'contains', value: 56 }],
      },
    };
    component.resetFilters();
    expect(component.tableState).toMatchSnapshot();
  });

  it('should reload', async () => {
    component.reloadEntities();
    expect(component.facade.reloadEntities).toHaveBeenCalledTimes(1);
  });

  it('should getRelatedField null', async () => {
    const result = component.getRelatedField();
    expect(result).toBeNull();
  });

  it('should getRelatedField parent', async () => {
    const result = component.getRelatedField({
      seperator: '.',
      segments: ['x', 'y', 'z'],
    });
    expect(result).toBe('x.y.z');
  });

  it('should getRelatedField child using interface', async () => {
    const result = component.getRelatedField({
      seperator: '/',
      segments: ['x', 'y', 'z'],
    });
    expect(result).toBe('x/y/z');
  });

  it('should getRelatedField child', async () => {
    const result = component.getRelatedField('x', 'y', 'z');
    expect(result).toBe('x/y/z');
  });

  it('should getRelatedField mixed', async () => {
    const result = component.getRelatedField('x.d', 'y', 'z');
    expect(result).toBe('x.d/y/z');
  });

  it('should handle dataStateChange', async () => {
    component.dataStateChange({});
    expect(component.facade.loadEntities).toHaveBeenCalledTimes(2);
  });

  it('should serialize/deserialize odataQuery filters correctly', () => {
    const tempDate = new Date();
    const serializedResult = component.serializeTableState({
      filters: {
        xyzDate: [
          {
            operator: 'eq',
            value: tempDate,
          },
        ],
      },
    });
    const deserializedResult =
      component.deserializeTableState(serializedResult);
    expect(deserializedResult.filters['xyzDate'].length).toBe(1);
  });

  it('should limit PrimeTableState sort parameters', () => {
    const primeTableState: PrimeTableState = {
      multiSortMeta: [
        { field: 'a', order: 1 },
        { field: 'b', order: 1 },
        { field: 'c', order: 1 },
        { field: 'd', order: 1 },
        { field: 'e', order: 1 },
        { field: 'f', order: 1 },
      ],
    };
    component.facade.loadEntities = jest.fn();
    component.loadEntities(primeTableState);
    expect(component.facade.loadEntities).toHaveBeenCalledTimes(1);
    expect(component.facade.loadEntities).toHaveBeenCalledWith({
      multiSortMeta: [
        { field: 'a', order: 1 },
        { field: 'b', order: 1 },
        { field: 'c', order: 1 },
        { field: 'd', order: 1 },
        { field: 'e', order: 1 },
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

const initialGridState: PrimeTableState = {
  select: ['x', 'y', 'z'],
  multiSortMeta: [{ field: 'x', order: 1 }],
  filters: { x: [{ matchMode: 'equals', operator: 'and', value: 1 }] },
};
@Component({
  selector: 'imng-test-component',
  template: '<h1></h1>',
})
class PrimeODataTableTestComponent extends ImngPrimeODataTableBaseComponent<
  object,
  ODataTableMockFacade
> {
  props = {};
  constructor() {
    super(createODataTableMockFacade(), initialGridState);
  }
}
