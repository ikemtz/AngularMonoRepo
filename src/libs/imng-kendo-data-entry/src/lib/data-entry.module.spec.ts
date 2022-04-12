import { TestBed } from '@angular/core/testing';
import { ImngDataEntryDialogModule } from './imng-kendo-data-entry.module';

describe('ImngDataEntryDialogModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImngDataEntryDialogModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(ImngDataEntryDialogModule).toBeDefined();
  });
});
