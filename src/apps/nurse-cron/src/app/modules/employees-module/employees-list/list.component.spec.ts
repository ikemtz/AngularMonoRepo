import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';
import { ModalStates } from 'imng-kendo-data-entry';

import { EmployeeListComponent } from './list.component';
import { EmployeeListFacade } from './list.facade';
import { EmployeeCrudFacade } from '../employees-crud';
import { employeeRoutes } from '../employees.routing';
import { createTestEmployee } from '../../../models/employees-api';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let listFacade: EmployeeListFacade;
  let crudFacade: EmployeeCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [],
      providers: [
        {
          provide: EmployeeListFacade,
          useValue: createODataGridMockFacade(),
        },
        { provide: EmployeeCrudFacade, useValue: createDataEntryMockFacade() },
        provideRouter(employeeRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(EmployeeListFacade);
    crudFacade = TestBed.inject(EmployeeCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createTestEmployee();
    component.detailExpanded({ dataItem } as never);
    expect(component.currentItem).toEqual(dataItem);
  });

  test('it should handle reload', () => {
    component.reloadEntities();
    expect(listFacade.reloadEntities).toHaveBeenCalledTimes(1);
  });

  test('it should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(
      {},
      ModalStates.ADD,
    );
  });

  test('it should handle EditItem', () => {
    const item = createTestEmployee();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(
      item,
      ModalStates.EDIT,
    );
  });

  test('it should handle DeleteItem', () => {
    const item = createTestEmployee();
    component.deleteItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(
      item,
      ModalStates.DELETE,
    );
  });
});
