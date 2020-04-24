import { async, TestBed } from '@angular/core/testing';
import { ImngAppInsightsNgrxModule } from './application-insights-ngrx.module';

describe('AppInsightsNgrxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngAppInsightsNgrxModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngAppInsightsNgrxModule).toBeDefined();
  });
});
