import { async, TestBed } from '@angular/core/testing';
import { ImngNgxbTypeaheadModule } from './ngxb-typeahead.module';

describe('ImngNgxbTypeaheadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngNgxbTypeaheadModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngNgxbTypeaheadModule).toBeDefined();
  });
});
