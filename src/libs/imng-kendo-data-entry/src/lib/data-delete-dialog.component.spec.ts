import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMNG_KENDO_DELETE_DIALOG } from './data-delete-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
describe('DataDeleteDialogComponent', () => {
  let fixture: ComponentFixture<IMNG_KENDO_DELETE_DIALOG>;
  let component: IMNG_KENDO_DELETE_DIALOG;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMNG_KENDO_DELETE_DIALOG],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(IMNG_KENDO_DELETE_DIALOG);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dataItem', { id: '😎' });
    fixture.componentRef.setInput('facade', {
      clearCurrentEntity: jest.fn(),
      deleteExistingEntity: jest.fn(),
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support cancel', () => {
    // Trigger change detection
    fixture.detectChanges();
    component.cancel();
    // Assert the expected behavior
    expect(component.facade().clearCurrentEntity).toHaveBeenCalled();
  });

  it('should support delete', () => {
    // Trigger change detection
    fixture.detectChanges();
    component.delete();
    // Assert the expected behavior
    expect(component.facade().deleteExistingEntity).toHaveBeenCalled();
  });
});
