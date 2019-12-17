import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { IAzSetting } from './az-setting.model';
@Component({
  selector: 'imng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  azConfig = new FormControl('');
  devConfig = new FormControl('');
  readonly initialDevSettings = { IsEncrypted: false, Values: {} };
  public editorOptions: JsonEditorOptions;

  constructor() {}
  ngOnInit(): void {
    this.azConfig.valueChanges.pipe(tap(t => this.convertAzConfig(t))).subscribe();
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code'];
    this.editorOptions.mode = 'code';
    this.editorOptions.navigationBar = false;
    this.editorOptions.mainMenuBar = false;
    this.devConfig.patchValue(this.initialDevSettings);
  }

  public convertAzConfig(settings: IAzSetting[]) {
    const devSettings = { ...this.initialDevSettings };
    settings
      .map(t => ({ name: t.name, value: t.value }))
      .forEach(t => {
        devSettings.Values[t.name] = t.value;
      });
    this.devConfig.patchValue(devSettings);
  }
}
