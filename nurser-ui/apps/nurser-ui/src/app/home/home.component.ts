import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngnu-ui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
