import { TestBed } from '@angular/core/testing';
import { AppInsightsMonitoringService, APP_INSIGHTS_CONFIG } from './app-insights-monitoring.service';

describe('AppInsightsMonitoringService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_INSIGHTS_CONFIG,
          multi: false,
          useValue: { instrumentationKey: 'abcb7484-6a9c-48a9-b44a-0ee4364aabc1' },
        },
      ],
    }),
  );

  it('should be created', () => {
    const service: AppInsightsMonitoringService = TestBed.inject(AppInsightsMonitoringService);
    expect(service).toBeTruthy();
  });
});
