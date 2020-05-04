import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNursesComponent } from './add-nurses.component';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddNursesComponent', () => {
  let component: AddNursesComponent;
  let fixture: ComponentFixture<AddNursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNursesComponent],
      imports: [ImngDataEntryDialogModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: NursesDataEntryFacade, useValue: createDataEntryMockFacade() }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
