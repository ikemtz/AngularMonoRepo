import { async, TestBed } from '@angular/core/testing';
import { ImngKendoODataModule } from './kendo-odata.module';

describe('ImngKendoODataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngKendoODataModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngKendoODataModule).toBeDefined();
  });


  it('should initialize', () => {
    const result = ImngKendoODataModule.forRoot();
    expect(result).toMatchSnapshot();
  });
});
