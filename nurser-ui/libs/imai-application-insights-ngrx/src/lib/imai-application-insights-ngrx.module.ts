import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInsightsMonitoringService, APP_INSIGHTS_CONFIG } from './app-insights-monitoring.service';
import { IConfiguration } from '@microsoft/applicationinsights-web';

@NgModule({
  imports: [CommonModule],
  providers: [AppInsightsMonitoringService]
})
export class AppInsightsNgrxModule {
  static forRoot(appInsightsConfiguration: IConfiguration) {
    return {
      ngModule: AppInsightsNgrxModule,
      providers: [
        { provide: APP_INSIGHTS_CONFIG, multi: false, useValue: appInsightsConfiguration }]
    };
  }
}