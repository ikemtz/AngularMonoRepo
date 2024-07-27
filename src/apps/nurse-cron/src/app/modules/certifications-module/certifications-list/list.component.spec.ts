import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  createDataEntryMockFacade,
  createDataDeleteMockFacade,
} from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { CertificationListComponent } from './list.component';
import { CertificationListFacade } from './list.facade';
import { CertificationCrudFacade } from '../certifications-crud';
import { certificationRoutes } from '../certifications.routing';
import { createTestCertification } from '../../../models/certifications-odata';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';

describe('CertificationListComponent', () => {
  let component: CertificationListComponent;
  let fixture: ComponentFixture<CertificationListComponent>;
  let listFacade: CertificationListFacade;
  let crudFacade: CertificationCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationListComponent],
      imports: [],
      providers: [
        {
          provide: CertificationListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        {
          provide: CertificationCrudFacade,
          useValue: createDataEntryMockFacade(),
        },
        provideRouter(certificationRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(CertificationListFacade);
    crudFacade = TestBed.inject(CertificationCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createTestCertification();
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
    const item = createTestCertification();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createTestCertification();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });
});
