import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { ScheduleListComponent } from './list.component';
import { createSchedule } from './list.facade.spec';
import { ScheduleListFacade } from './list.facade';
import { ScheduleCrudFacade } from '../schedules-crud';

describe('ScheduleListComponent', () => {
  let component: ScheduleListComponent;
  let fixture: ComponentFixture<ScheduleListComponent>;
  let listFacade: ScheduleListFacade;
  let crudFacade: ScheduleCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ScheduleListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: ScheduleCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(ScheduleListFacade);
    crudFacade = TestBed.inject(ScheduleCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createSchedule();
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
    const item = createSchedule();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createSchedule();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
