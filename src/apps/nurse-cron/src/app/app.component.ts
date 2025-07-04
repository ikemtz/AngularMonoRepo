import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'nrcrn-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  public readonly year: number;
  public readonly buildNumber: string;

  constructor() {
    this.year = new Date().getFullYear();
    this.buildNumber = environment.version;
  }
}
