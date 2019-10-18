import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNursesComponent } from './edit-nurses.component';

describe('EditNursesComponent', () => {
  let component: EditNursesComponent;
  let fixture: ComponentFixture<EditNursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditNursesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
