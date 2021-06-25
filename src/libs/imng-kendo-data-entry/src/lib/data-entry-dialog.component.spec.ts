import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseDataEntryComponent } from './base-data-entry.component';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { DataEntryMockFacade, createDataEntryMockFacade } from '../../testing/src/data-entry-mock.facade';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';

const template = '<imng-data-entry-dialog [width]="700" [height]="550" [parentComponent]="this"></imng-data-entry-dialog>';
describe('DataEntryDialogComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataEntryDialogComponent, TestHostComponent],
      imports: [DialogModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: DataEntryMockFacade, useValue: createDataEntryMockFacade() }],
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

  it('should handle close()', () => {
    const comp = component as unknown as {
      allSubscriptions: Subscriptions,
      submitted$: Observable<boolean>;
      closeForm: () => void;
      onCancel: () => void;
    };
    comp.allSubscriptions.push(comp.submitted$.subscribe());
    comp.closeForm = jest.fn();
    comp.onCancel();
    expect(comp.closeForm).toBeCalledTimes(1);
  });

  it('should handle submit()', () => {
    component.onSubmit();
    component.save = jest.fn();
    expect(component.saved).toBe(true);
  });
});

@Component({
  selector: 'imng-thc',
  template: template
})
// eslint-disable-next-line @typescript-eslint/ban-types
export class TestHostComponent
  extends BaseDataEntryComponent<DataEntryMockFacade>
  implements Subscribable {

  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public saved = false;
  constructor(facade: DataEntryMockFacade) {
    super(facade);
  }
  public initForm(): void {
    this.addEditForm = new FormGroup({ id: new FormControl() });
  }
  public save(): void {
    this.saved = true;
  }
}

describe('DataEntryDialog', () => {
  let component: DataEntryDialogComponent;
  const parentComponent = {
    dialogTitle: '🔥',
    loading$: '💩',
    addEditForm: '🐎',
    closeForm: jest.fn(),
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    component = new DataEntryDialogComponent();
    component.parentComponent = parentComponent as never;
  });

  it('should create', () => {
    expect(component).toMatchSnapshot();
  });

  it('should close', () => {
    component.close();
    expect(parentComponent.closeForm).toBeCalledTimes(1);
  });

  it('should cancel', () => {
    component.cancel();
    expect(parentComponent.onCancel).toBeCalledTimes(1);
  });

  it('should submit', () => {
    component.submit();
    expect(parentComponent.onSubmit).toBeCalledTimes(1);
  });

  it('should handle null parent', done => {
    try {
      component.parentComponent = null;
      component.ngOnInit();
      done.fail('shouldve thrown an err');
    } catch (err) {
      expect(err).toMatchSnapshot();
      done();
    }
  });
});
