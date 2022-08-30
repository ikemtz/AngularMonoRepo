import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ODataClientService } from './services/odata-client.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ODataClientService]
})
export class ImngOdataModule { }
