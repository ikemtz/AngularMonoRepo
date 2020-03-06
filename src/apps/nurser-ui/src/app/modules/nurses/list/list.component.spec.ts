import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NurseCertificationDataEntryFacade } from '../add-edit-nurse-certification/nurse-certification-data-entry-facade';
import { ListFacade } from './list.facade';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { NursesDataEntryFacade } from '../add-edit-nurses/nurses-data-entry-facade';

describe('NursesComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NursesDataEntryFacade, useValue: createDataEntryMockFacade() },
        { provide: NurseCertificationDataEntryFacade, useValue: createDataEntryMockFacade() },
        { provide: ListFacade, useValue: createODataGridMockFacade() },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
