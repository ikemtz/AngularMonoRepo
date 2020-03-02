import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseDataEntryComponent } from './base-data-entry.component';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { DataEntryMockFacade, createDataEntryMockFacade } from 'libs/imng-kendo-data-entry/testing/src/data-entry-mock-facade';

describe('DataEntryDialogComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataEntryDialogComponent, TestHostComponent],
      imports: [DialogModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'imng-thc',
  template: '<imng-data-entry-dialog [width]="700" [height]="550" [parentComponent]="this"></imng-data-entry-dialog>',
})
export class TestHostComponent extends BaseDataEntryComponent<object, DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  constructor() {
    super(createDataEntryMockFacade());
  }
  public initForm() {}
  public save() {}
}
