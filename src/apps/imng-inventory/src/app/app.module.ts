import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([], { initialNavigation: 'enabled' }), BarecodeScannerLivestreamModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
