import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgJsonEditorModule, ReactiveFormsModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
