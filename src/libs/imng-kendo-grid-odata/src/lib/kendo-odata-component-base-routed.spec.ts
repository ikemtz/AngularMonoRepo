import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoODataComponentBase } from './kendo-odata-component-base';
import { ODataGridMockFacade, createODataGridMockFacade } from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import { ODataResultEmpty, ODataState } from 'imng-kendo-odata';
import { Router } from '@angular/router';

describe('KendoODataComponentBaseRouted', () => {
  let component: KendoODataGridTestComponent;
  let fixture: ComponentFixture<KendoODataGridTestComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KendoODataGridTestComponent],
      providers: [{
        provide: Router, useValue: {
          routerState: { snapshot: { root: { queryParams: { odataState: 'eyJ0YWtlIjoyMCwic2tpcCI6MCwic29ydCI6W3siZmllbGQiOiJpZCIsImRpciI6ImFzYyJ9XX0=' } } } },
          navigate: jest.fn(),
        }
      }],
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
    expect(router.navigate).toBeCalledTimes(1);
    expect(router.navigate).toHaveBeenNthCalledWith(1, [], {
      queryParams: {
        odataState: 'eyJ0YWtlIjoyMCwic2tpcCI6MCwic29ydCI6W3siZmllbGQiOiJpZCIsImRpciI6ImFzYyJ9XX0='
      },
      queryParamsHandling: 'merge',
      relativeTo: undefined,
      skipLocationChange: false,
    });
  });

  it('should export to Excel', async () => {
    const data = await readFirst(component.excelData());
    expect(data).toStrictEqual(ODataResultEmpty);
  });
});
const initialGridState: ODataState = {
  selectors: ['x', 'y', 'z'],
  sort: [{ field: 'x', dir: 'desc' }],
  skip: 20,
};
@Component({
  selector: 'imng-test-component',
  template: '<h1></h1>',
})
// eslint-disable-next-line @typescript-eslint/ban-types
export class KendoODataGridTestComponent extends KendoODataComponentBase<object, ODataGridMockFacade> {


  props = {};
  constructor(readonly router: Router) {
    super(createODataGridMockFacade(), initialGridState, router);
  }
}
