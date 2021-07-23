import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoODataComponentBase } from './kendo-odata-component-base';
import { ODataGridMockFacade, createODataGridMockFacade } from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import { ODataResultEmpty, ODataState } from 'imng-kendo-odata';

describe('KendoODataComponentBase', () => {
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
    expect(data).toStrictEqual(ODataResultEmpty);
  });

  it('should reset', async () => {
    component.gridDataState = { ...component.gridDataState, filter: { logic: 'and', filters: [{ field: 'y', operator: 'contains', value: 56 }] } };
    component.resetFilters();
    expect(component.gridDataState).toMatchSnapshot();
  });
});

const initialGridState: ODataState = {
  selectors: ['x', 'y', 'z'],
  sort: [{ field: 'x', dir: 'desc' }],
  filter: { logic: 'and', filters: [{ field: 'x', operator: 'eq', value: 1 }] }
};
@Component({
  selector: 'imng-test-component',
  template: '<h1></h1>',
})
// eslint-disable-next-line @typescript-eslint/ban-types
export class KendoODataGridTestComponent extends KendoODataComponentBase<object, ODataGridMockFacade> {

  props = {};
  constructor() {
    super(createODataGridMockFacade(), initialGridState);
  }
}
