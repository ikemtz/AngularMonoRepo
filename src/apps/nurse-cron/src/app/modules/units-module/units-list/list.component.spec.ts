import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { UnitListComponent } from './list.component';
import { createUnit } from './list.facade.spec';
import { UnitListFacade } from './list.facade';
import { UnitCrudFacade } from '../units-crud';

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;
  let listFacade: UnitListFacade;
  let crudFacade: UnitCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnitListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: UnitListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: UnitCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(UnitListFacade);
    crudFacade = TestBed.inject(UnitCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createUnit();
    component.detailExpanded({ dataItem } as never);
    expect(component.currentItem).toEqual(dataItem);
  });

  test('it should handle reload', () => {
    component.reloadEntities();
    expect(listFacade.reloadEntities).toBeCalledTimes(1);
  });

  test('it should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });

  test('it should handle EditItem', () => {
    const item = createUnit();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createUnit();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
