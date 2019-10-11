import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryDialogComponent } from './data-entry-dialog.component';

describe('DataEntryDialogComponent', () => {
  let component: DataEntryDialogComponent;
  let fixture: ComponentFixture<DataEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
