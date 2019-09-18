import { async, TestBed } from '@angular/core/testing';
import { ImngKendoTypeaheadModule } from './imng-kendo-typeahead.module';

describe('ImngKendoTypeaheadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngKendoTypeaheadModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngKendoTypeaheadModule).toBeDefined();
  });
});
