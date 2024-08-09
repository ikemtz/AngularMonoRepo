import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  createDataEntryMockFacade,
  createDataDeleteMockFacade,
} from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { HealthItemListComponent } from './list.component';
import { HealthItemListFacade } from './list.facade';
import { HealthItemCrudFacade } from '../health-items-crud';
import { healthItemRoutes } from '../health-items.routing';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';
import { createTestHealthItem } from '../../../models/health-items-odata';

describe('HealthItemListComponent', () => {
  let component: HealthItemListComponent;
  let fixture: ComponentFixture<HealthItemListComponent>;
  let listFacade: HealthItemListFacade;
  let crudFacade: HealthItemCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HealthItemListComponent],
      imports: [],
      providers: [
        {
          provide: HealthItemListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        {
          provide: HealthItemCrudFacade,
          useValue: createDataEntryMockFacade(),
        },
        provideRouter(healthItemRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(HealthItemListFacade);
    crudFacade = TestBed.inject(HealthItemCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createTestHealthItem();
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
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith({});
  });

  test('it should handle EditItem', () => {
    const item = createTestHealthItem();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createTestHealthItem();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });
});
