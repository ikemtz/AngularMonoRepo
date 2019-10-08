import { async, TestBed } from '@angular/core/testing';
import { ImngKendoChartOdataModule } from './imng-kendo-chart-odata.module';

describe('ImngKendoChartOdataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngKendoChartOdataModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngKendoChartOdataModule).toBeDefined();
  });
});
