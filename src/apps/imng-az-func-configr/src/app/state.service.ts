import { Injectable } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { BehaviorSubject } from 'rxjs';
import { ITransformer, AzFunc, initialFunctionDevSettings } from './transformers';
import { IAzSetting, ILocalSetting } from './az-setting.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public readonly editorOptions: JsonEditorOptions;
  public readonly output$ = new BehaviorSubject<ILocalSetting | string>(initialFunctionDevSettings());
  public currentTransformer: ITransformer = AzFunc;
  public readonly currentTransformer$ = new BehaviorSubject<ITransformer>(this.currentTransformer);
  private currentData: IAzSetting[];

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code'];
    this.editorOptions.mode = 'code';
    this.editorOptions.navigationBar = false;
    this.editorOptions.mainMenuBar = false;
  }

  public setTransformer(transformer: ITransformer): void {
    this.currentTransformer = transformer;
    this.currentTransformer$.next(transformer);
    this.output$.next(transformer.convert(this.currentData));
  }

  public setAzConfiguration(data: IAzSetting[]): void {
    this.currentData = data;
    this.output$.next(this.currentTransformer.convert(data));
  }
}
