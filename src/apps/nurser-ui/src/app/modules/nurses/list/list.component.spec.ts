import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NurseCertificationDataEntryFacade } from '../add-edit-nurse-certification/nurse-certification-data-entry-facade';
import { of } from 'rxjs';
import { ListFacade } from './list.facade';
import {} from 'imng-kendo-grid-odata/testing';

describe('NursesComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: NurseCertificationDataEntryFacade, useValue: { currentEntity: of({}) } }],
      providers: [{ provide: ListFacade, useValue: KendoODataGridMockFacade.create() }],
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
