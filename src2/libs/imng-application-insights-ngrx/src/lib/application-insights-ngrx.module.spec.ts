import { TestBed } from '@angular/core/testing';
import { ImngAppInsightsNgrxModule } from './application-insights-ngrx.module';

describe('ImngAppInsightsNgrxModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImngAppInsightsNgrxModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(ImngAppInsightsNgrxModule).toBeDefined();
  });
});
