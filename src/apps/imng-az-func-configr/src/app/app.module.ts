import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, JsonViewerComponent],
  imports: [BrowserModule,
    NgJsonEditorModule,
    ReactiveFormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
