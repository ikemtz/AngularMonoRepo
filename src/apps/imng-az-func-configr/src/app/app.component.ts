import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { ILocalSetting } from './az-setting.model';
import { Observable } from 'rxjs';
import { StateService } from './state.service';
import { ITransformer, transformers } from './transformers';

@Component({
  selector: 'imng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly azConfig = new FormControl('');
  public readonly editorOptions: JsonEditorOptions;
  public readonly currentTransformer$: Observable<ITransformer>;
  public readonly transformers: ITransformer[];
  public readonly transformerOutput$: Observable<ILocalSetting | string>;

  constructor(public readonly stateService: StateService) {
    this.editorOptions = stateService.editorOptions;
    this.currentTransformer$ = stateService.currentTransformer$;
    this.transformers = transformers;
    this.transformerOutput$ = stateService.output$;
  }

  ngOnInit(): void {
    this.azConfig.valueChanges
      .pipe(
        tap(data => this.stateService.setAzConfiguration(data)),
      )
      .subscribe();
  }

  public setTransformer(transformer: ITransformer): void {
    this.stateService.setTransformer(transformer);
  }
}
