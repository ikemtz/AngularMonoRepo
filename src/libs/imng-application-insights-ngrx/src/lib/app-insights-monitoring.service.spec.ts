import { TestBed } from '@angular/core/testing';
import { createAction } from '@ngrx/store';
import { of } from 'rxjs';
import {
  AppInsightsMonitoringService,
  APP_INSIGHTS_CONFIG,
} from './app-insights-monitoring.service';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('AppInsightsMonitoringService', () => {
  let service: AppInsightsMonitoringService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_INSIGHTS_CONFIG,
          multi: false,
          useValue: {
            instrumentationKey: 'abcb7484-6a9c-48a9-b44a-0ee4364aabc1',
          },
        },
      ],
    });
    service = TestBed.inject(AppInsightsMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.appInsights).toBeTruthy();
  });

  it('should handle setAuthenticatedUserContext', () => {
    service.appInsights.setAuthenticatedUserContext = jest.fn();
    service.setAuthenticatedUserContext('🐱‍👤');
    expect(
      service.appInsights.setAuthenticatedUserContext,
    ).toHaveBeenCalledTimes(1);
    expect(
      service.appInsights.setAuthenticatedUserContext,
    ).toHaveBeenCalledWith('🐱‍👤', undefined, true);
  });

  it('should handle clearAuthenticatedUserContext', () => {
    service.appInsights.clearAuthenticatedUserContext = jest.fn();
    service.clearAuthenticatedUserContext();
    expect(
      service.appInsights.clearAuthenticatedUserContext,
    ).toHaveBeenCalledTimes(1);
    expect(
      service.appInsights.clearAuthenticatedUserContext,
    ).toHaveBeenCalledWith();
  });

  it('should handle logException', () => {
    service.appInsights.trackException = jest.fn();
    const err = new Error('🐱‍👤 struck again');
    service.logException(err);
    expect(service.appInsights.trackException).toHaveBeenCalledTimes(1);
    expect(service.appInsights.trackException).toHaveBeenCalledWith({
      exception: err,
      measurements: undefined,
      properties: undefined,
    });
  });

  it('should handle logEvent', () => {
    service.appInsights.trackEvent = jest.fn();
    service.logEvent('happy 🐱');
    expect(service.appInsights.trackEvent).toHaveBeenCalledTimes(1);
    expect(service.appInsights.trackEvent).toHaveBeenCalledWith({
      measurements: undefined,
      name: 'happy 🐱',
      properties: undefined,
    });
  });

  it('should handle trackEventsEffect', async () => {
    const testAction = createAction('[test] Action');

    service.appInsights.trackEvent = jest.fn();
    await readFirst(service.trackEventsEffect(of(testAction()), true));
    expect(service.appInsights.trackEvent).toHaveBeenCalledTimes(1);
    expect(service.appInsights.trackEvent).toHaveBeenCalledWith({
      measurements: undefined,
      name: '[test] Action',
      properties: undefined,
    });
  });

  it('should handle trackErrorsEffect', async () => {
    const testActionError = createAction('[test] Action Error');

    service.appInsights.trackException = jest.fn();
    await readFirst(service.trackErrorsEffect(of(testActionError())));
    expect(service.appInsights.trackException).toHaveBeenCalledTimes(1);
    expect(service.appInsights.trackException).toHaveBeenCalledWith({
      exception: { type: '[test] Action Error' },
      measurements: undefined,
      properties: undefined,
    });
  });
});
