/// <reference types="jest" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMNG_KENDO_COPY } from './kendo-copy.component';

describe('ImngKendoCopyComponent', () => {
  let component: IMNG_KENDO_COPY;
  let fixture: ComponentFixture<IMNG_KENDO_COPY>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMNG_KENDO_COPY],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMNG_KENDO_COPY);
    component = fixture.componentInstance;
    component.copyValue = 'x';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.displayValue).toBe('x');
    component.copy();
  });
});
