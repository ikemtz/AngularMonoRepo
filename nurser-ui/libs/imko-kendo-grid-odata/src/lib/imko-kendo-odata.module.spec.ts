import { async, TestBed } from '@angular/core/testing';
import { KendoOdataModule } from './imko-kendo-odata.module';

describe('KendoOdataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KendoOdataModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(KendoOdataModule).toBeDefined();
  });
});
