import { Component, AfterViewInit } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'imng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public errorMessage: string;


  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    }

    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment'
        },
        area: { // defines rectangle of the detection/localization area
          top: '40%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '40%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader']
      },
    },
      (err) => {
        if (err) {
          this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
        } else {
          Quagga.start();
          Quagga.onDetected((res) => {
            this.onBarcodeScanned(res.codeResult.code);
          });
        }
      });
  }

  onBarcodeScanned(code: string) {
    console.log(code);
  }
}
