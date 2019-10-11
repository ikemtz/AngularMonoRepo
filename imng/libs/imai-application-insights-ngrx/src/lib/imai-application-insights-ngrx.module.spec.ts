import { async, TestBed } from '@angular/core/testing';
import { AppInsightsNgrxModule, } from './imai-application-insights-ngrx.module';

describe('AppInsightsNgrxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppInsightsNgrxModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppInsightsNgrxModule).toBeDefined();
  });
});
