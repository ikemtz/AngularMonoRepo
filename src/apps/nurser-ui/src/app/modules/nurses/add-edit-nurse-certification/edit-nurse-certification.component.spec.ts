import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNurseCertificationComponent } from './edit-nurse-certification.component';

describe('EditNursesComponent', () => {
  let component: EditNurseCertificationComponent;
  let fixture: ComponentFixture<EditNurseCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditNurseCertificationComponent],
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
