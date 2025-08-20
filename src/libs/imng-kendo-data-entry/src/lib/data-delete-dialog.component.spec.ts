import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDeleteDialogComponent } from './data-delete-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
describe('DataDeleteDialogComponent', () => {
  let fixture: ComponentFixture<DataDeleteDialogComponent>;
  let component: DataDeleteDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDeleteDialogComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDeleteDialogComponent);
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
