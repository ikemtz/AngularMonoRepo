import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import {
  Component,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseDataEntryComponent } from './base-data-entry.component';
// tslint:disable-next-line: nx-enforce-module-boundaries
import {
  DataEntryMockFacade,
  createDataEntryMockFacade,
} from '../../testing/src/data-entry-mock.facade';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogButtonsDirective } from './dialog-buttons.directive';
import { By } from '@angular/platform-browser';

describe('DialogButtonsDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataEntryDialogComponent,
        TestHostComponent,
        DialogButtonsDirective,
      ],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DataEntryMockFacade, useValue: createDataEntryMockFacade() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle submit', () => {
    component.onSubmit = jest.fn();
    const element = fixture.debugElement.query(By.css('#x'));
    element.nativeElement.click();
    expect(element.nativeElement).toMatchSnapshot();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
  it('should handle cancel', () => {
    component.onCancel = jest.fn();
    const element = fixture.debugElement.query(By.css('#y'));
    element.nativeElement.click();
    expect(element.nativeElement).toMatchSnapshot();
    expect(component.onCancel).toHaveBeenCalledTimes(1);
  });
});

@Component({
  selector: 'imng-thc',
  template: ` <imng-data-entry-dialog
    [width]="700"
    [height]="550"
    [parentComponent]="this">
    <ng-template [imngDialogBtns] let-coreButtons>
      <button id="y" (click)="coreButtons.cancel()">😈</button>
      <button
        type="submit"
        [attr.form]="formId"
        id="x"
        (click)="coreButtons.submit()">
        {{ saveButtonText }}
      </button>
    </ng-template>
  </imng-data-entry-dialog>`,
})
// eslint-disable-next-line @typescript-eslint/ban-types
export class TestHostComponent extends BaseDataEntryComponent<DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public saved = false;
  public addEditForm = new FormGroup({ id: new FormControl<string>('') });
  constructor(facade: DataEntryMockFacade) {
    super(facade);
  }
  public initForm(): void {
    this.addEditForm = new FormGroup({ id: new FormControl<string>('') });
  }
  public save(): void {
    this.saved = true;
  }
}
