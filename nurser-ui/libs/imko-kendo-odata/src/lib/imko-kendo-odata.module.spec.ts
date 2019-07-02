import { async, TestBed } from '@angular/core/testing';
import { ImkoKendoOdataModule } from './imko-kendo-odata.module';

describe('ImkoKendoOdataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImkoKendoOdataModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImkoKendoOdataModule).toBeDefined();
  });
});
