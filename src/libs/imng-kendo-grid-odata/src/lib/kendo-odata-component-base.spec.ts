import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KendoODataComponentBase } from './kendo-odata-component-base';
import { ODataGridMockFacade, createODataGridMockFacade } from '../../testing/src';
import { readFirst } from '@nrwl/angular/testing';
import { ODataResultEmpty } from 'imng-kendo-odata';

describe('KendoODataComponentBase', () => {
  let component: KendoODataGridTestComponent;
  let fixture: ComponentFixture<KendoODataGridTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KendoODataGridTestComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoODataGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export to Excel', async done => {
    try {
      const data = await readFirst(component.excelData());
      expect(data).toStrictEqual(ODataResultEmpty);
      done();
    }
    catch (err) {
      done.fail(err);
    }
  });
});

@Component({
  selector: 'imng-test-component',
  template: '<h1></h1>',
})
export class KendoODataGridTestComponent extends KendoODataComponentBase<object, ODataGridMockFacade> {
  state = {};
  props = {};
  constructor() {
    super(createODataGridMockFacade(), {});
  }
}
