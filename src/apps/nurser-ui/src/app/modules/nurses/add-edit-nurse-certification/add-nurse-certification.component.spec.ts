import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurseCertificationComponent } from './add-nurse-certification.component';

describe('AddNursesComponent', () => {
  let component: AddNurseCertificationComponent;
  let fixture: ComponentFixture<AddNurseCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNurseCertificationComponent],
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
