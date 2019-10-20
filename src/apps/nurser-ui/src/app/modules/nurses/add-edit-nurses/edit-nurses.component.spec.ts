import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNursesComponent } from './edit-nurses.component';
import { DataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';

describe('EditNursesComponent', () => {
  let component: EditNursesComponent;
  let fixture: ComponentFixture<EditNursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditNursesComponent],
      imports: [DataEntryDialogModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: NursesDataEntryFacade, useValue: createDataEntryMockFacade() }],
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
