import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ODataClientService } from './services/odata-client.service';

@NgModule({ imports: [CommonModule], providers: [ODataClientService, provideHttpClient(withInterceptorsFromDi())] })
export class ImngODataClientModule {}
