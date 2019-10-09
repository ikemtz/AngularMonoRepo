import { async, TestBed } from '@angular/core/testing';
import { KendoODataModule } from '..';

describe('KendoOdataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KendoODataModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(KendoODataModule).toBeDefined();
  });
});
