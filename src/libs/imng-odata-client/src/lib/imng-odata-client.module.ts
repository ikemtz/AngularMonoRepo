import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { ODataClientService } from './services/odata-client.service';

@NgModule({ imports: [CommonModule], providers: [ODataClientService, provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class ImngODataClientModule {}
