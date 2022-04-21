import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImngKendoCopyComponent } from './kendo-copy.component';

describe('ImngKendoCopyComponent', () => {
  let component: ImngKendoCopyComponent;
  let fixture: ComponentFixture<ImngKendoCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImngKendoCopyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImngKendoCopyComponent);
    component = fixture.componentInstance;
    component.copyValue = "x";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.displayValue).toBe('x');
    component.copy();
  });
});
