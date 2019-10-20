import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNursesComponent } from './add-nurses.component';
import { DataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';
import { of } from 'rxjs';

describe('AddNursesComponent', () => {
  let component: AddNursesComponent;
  let fixture: ComponentFixture<AddNursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNursesComponent],
      imports: [DataEntryDialogModule, ReactiveFormsModule],
      providers: [{ provide: NursesDataEntryFacade, useValue: { currentEntity$: of({}) } }],
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
