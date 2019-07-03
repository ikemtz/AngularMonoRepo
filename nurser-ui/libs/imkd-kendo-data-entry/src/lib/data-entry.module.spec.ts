import { async, TestBed } from '@angular/core/testing';
import { DataEntryDialogModule } from './data-entry.module';

describe('DataEntryDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataEntryDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataEntryDialogModule).toBeDefined();
  });
});
