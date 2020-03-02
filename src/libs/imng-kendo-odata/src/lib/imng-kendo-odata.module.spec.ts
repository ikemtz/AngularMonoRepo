import { async, TestBed } from '@angular/core/testing';
import { KendoODataModule } from './imng-kendo-odata.module';

describe('KendoODataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KendoODataModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(KendoODataModule).toBeDefined();
  });
});
