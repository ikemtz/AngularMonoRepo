import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInsightsMonitoringService, APP_INSIGHTS_CONFIG } from './app-insights-monitoring.service';
import { IConfiguration } from '@microsoft/applicationinsights-web';

@NgModule({
  imports: [CommonModule],
  providers: [AppInsightsMonitoringService],
})
export class ImngAppInsightsNgrxModule {
  static forRoot(appInsightsConfiguration: IConfiguration): ModuleWithProviders<ImngAppInsightsNgrxModule> {
    return {
      ngModule: ImngAppInsightsNgrxModule,
      providers: [{ provide: APP_INSIGHTS_CONFIG, multi: false, useValue: appInsightsConfiguration }],
    };
  }
}
