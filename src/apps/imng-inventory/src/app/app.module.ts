import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([], {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'corrected'
  }
  ), BarcodeScannerLivestreamComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
