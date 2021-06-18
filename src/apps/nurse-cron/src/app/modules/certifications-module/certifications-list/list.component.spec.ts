import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationListComponent } from './list.component';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { createCertification } from './list.facade.spec';
import { CertificationListFacade } from './list.facade';
import { CertificationCrudFacade } from '../certifications-crud';
import { RouterTestingModule } from '@angular/router/testing';

describe('CertificationListComponent', () => {
  let component: CertificationListComponent;
  let fixture: ComponentFixture<CertificationListComponent>;
  let listFacade: CertificationListFacade;
  let crudFacade: CertificationCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CertificationListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: CertificationCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(CertificationListFacade);
    crudFacade = TestBed.inject(CertificationCrudFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });

  it('should handle EditItem', () => {
    const item = createCertification();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  it('should handle DeleteItem', () => {
    const item = createCertification();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
