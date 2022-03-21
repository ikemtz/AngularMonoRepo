import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BarcodeScannerLivestreamModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
