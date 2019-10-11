import { TestBed } from '@angular/core/testing';

import { AppInsightsMonitoringService } from './app-insights-monitoring.service';

describe('AppInsightsMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppInsightsMonitoringService = TestBed.get(AppInsightsMonitoringService);
    expect(service).toBeTruthy();
  });
});
