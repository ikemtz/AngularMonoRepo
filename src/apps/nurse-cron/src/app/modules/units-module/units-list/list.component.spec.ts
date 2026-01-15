import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  createDataEntryMockFacade,
  createDataDeleteMockFacade,
} from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { UnitListComponent } from './list.component';
import { UnitListFacade } from './list.facade';
import { UnitCrudFacade } from '../units-crud';
import { unitRoutes } from '../units.routing';
import { createTestUnit } from '../../../models/units-odata';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;
  let listFacade: UnitListFacade;
  let crudFacade: UnitCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UnitListComponent],
      providers: [
        {
          provide: UnitListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        { provide: UnitCrudFacade, useValue: createDataEntryMockFacade() },
        provideRouter(unitRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
    const dataItem = createTestUnit();
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
    const item = createTestUnit();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createTestUnit();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });
});
