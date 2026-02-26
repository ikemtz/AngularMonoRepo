///<reference types="jest" />
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_MENU } from '@progress/kendo-angular-menu';
import { IMNG_KENDO_GRID_ODATA_HEADER } from 'imng-kendo-grid-odata';
import {
  createDataDeleteMockFacade,
  createDataEntryMockFacade,
} from 'imng-kendo-data-entry/testing';
import {
  createODataGridMockFacade,
  getKendoGridODataHeaderOverride,
} from 'imng-kendo-grid-odata/testing';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';
import { ModalStates } from 'imng-kendo-data-entry';

import { CustomerListComponent } from './list.component';
import {
  CustomerListFacade,
  CustomerCrudFacade,
  CustomersNgrxModule,
} from '../customers-ngrx-module';
import { createTestCustomer } from '../../models/webapi';
import {
  IMNG_KENDO_GRID_TESTING_STUBS,
  IMNG_KENDO_GRID_HEADER_TESTING_STUBS,
  provideGridComponent,
} from 'imng-kendo-testing-stubs';
import { CustomerAddComponent } from '../customers-crud/add.component';
import { CustomerEditComponent } from '../customers-crud/edit.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let listFacade: CustomerListFacade;
  let crudFacade: CustomerCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CustomerListComponent],
      providers: [
        { provide: CustomerListFacade, useValue: createODataGridMockFacade() },
        {
          provide: CustomerCrudFacade,
          useValue: {
            ...createDataEntryMockFacade(),
            ...createDataDeleteMockFacade(),
          },
        },
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .overrideComponent(
        IMNG_KENDO_GRID_ODATA_HEADER,
        getKendoGridODataHeaderOverride(),
      )
      .overrideComponent(CustomerListComponent, {
        remove: {
          imports: [
            KENDO_GRID,
            KENDO_MENU,
            KENDO_SVGICON,
            CustomerAddComponent,
            CustomerEditComponent,
            CustomersNgrxModule,
          ],
        },
        add: {
          imports: [...IMNG_KENDO_GRID_TESTING_STUBS],
          providers: [provideGridComponent()],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    listFacade = component.facade;
    crudFacade = component.crudFacade;
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createTestCustomer();
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
    const item = createTestCustomer();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(
      item,
      ModalStates.EDIT,
    );
  });

  test('it should handle DeleteItem', () => {
    const item = createTestCustomer();
    component.deleteItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(
      item,
      ModalStates.DELETE,
    );
  });
});
