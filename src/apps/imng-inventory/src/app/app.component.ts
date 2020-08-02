import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'imng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;
  barcodeValue;
  barcodeTypes = ['upc'];

  public errorMessage: string;

  ngAfterViewInit(): void {
    this.barecodeScanner.start();
  }

  onValueChanges(result: { codeResult: { code: string; }; }): void {
    this.barcodeValue = result.codeResult.code;
    console.log(JSON.stringify(result));
  }
  onStarted(started: unknown): void {
    console.log(started);
  }
}
