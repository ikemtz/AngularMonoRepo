import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  createDataEntryMockFacade,
  createDataDeleteMockFacade,
} from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { BuildingListComponent } from './list.component';
import { BuildingListFacade } from './list.facade';
import { BuildingCrudFacade } from '../buildings-crud';
import { buildingRoutes } from '../buildings.routing';
import { createTestBuilding } from '../../../models/units-odata';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';

describe('BuildingListComponent', () => {
  let component: BuildingListComponent;
  let fixture: ComponentFixture<BuildingListComponent>;
  let listFacade: BuildingListFacade;
  let crudFacade: BuildingCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingListComponent],
      imports: [],
      providers: [
        {
          provide: BuildingListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        { provide: BuildingCrudFacade, useValue: createDataEntryMockFacade() },
        provideRouter(buildingRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(BuildingListFacade);
    crudFacade = TestBed.inject(BuildingCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createTestBuilding();
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
    const item = createTestBuilding();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createTestBuilding();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });
});
