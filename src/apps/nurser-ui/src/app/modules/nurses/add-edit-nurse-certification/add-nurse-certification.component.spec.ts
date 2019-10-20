import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurseCertificationComponent } from './add-nurse-certification.component';
import { DataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { NurseCertificationDataEntryFacade } from './nurse-certification-data-entry-facade';

describe('AddNursesComponent', () => {
  let component: AddNurseCertificationComponent;
  let fixture: ComponentFixture<AddNurseCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNurseCertificationComponent],
      imports: [DataEntryDialogModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: NurseCertificationDataEntryFacade, useValue: createDataEntryMockFacade() }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNurseCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
