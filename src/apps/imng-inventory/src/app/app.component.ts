import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'imng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barecodeScanner?: BarcodeScannerLivestreamComponent;
  public barcodeValue?: string;
  public readonly barcodeTypes = ['upc'];

  public errorMessage?: string;

  ngAfterViewInit(): void {
    this.barecodeScanner?.start();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChanges(result: { codeResult: { code: string } } | any): void {
    this.barcodeValue = result.codeResult.code;
    console.log(JSON.stringify(result)); //NOSONAR
  }
  onStarted(started: unknown): void {
    console.log(started); //NOSONAR
  }
}
