import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNurseCertificationComponent } from './edit-nurse-certification.component';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NurseCertificationDataEntryFacade } from './nurse-certification-data-entry-facade';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';

describe('EditNursesComponent', () => {
  let component: EditNurseCertificationComponent;
  let fixture: ComponentFixture<EditNurseCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditNurseCertificationComponent],
      imports: [ImngDataEntryDialogModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: NurseCertificationDataEntryFacade, useValue: createDataEntryMockFacade() }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNurseCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
