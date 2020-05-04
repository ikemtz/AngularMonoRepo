import { async, TestBed } from '@angular/core/testing';
import { ImngDataEntryDialogModule } from './data-entry.module';

describe('ImngDataEntryDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngDataEntryDialogModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngDataEntryDialogModule).toBeDefined();
  });
});
