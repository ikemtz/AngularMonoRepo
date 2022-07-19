import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { StateService } from '../state.service';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'imng-json-viewer',
  templateUrl: './json-viewer.component.html',
})
export class JsonViewerComponent implements OnDestroy {

  public readonly devConfig = new UntypedFormControl({});
  public readonly editorOptions: JsonEditorOptions;
  public readonly outputSubscription: Subscription;

  constructor(public readonly stateService: StateService) {
    this.editorOptions = stateService.editorOptions;
    this.outputSubscription = stateService.output$.subscribe(output => this.devConfig.patchValue(output));
  }

  ngOnDestroy(): void {
    this.outputSubscription.unsubscribe();
  }
}
