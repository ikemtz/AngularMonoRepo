import { Injectable } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable, EMPTY } from 'rxjs'; 
import { environment } from '../environments/environment';

export declare var navigator;

@Injectable({ providedIn: 'root' })
export class AppPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return environment.production && this.hasGoodConnection() ? load() : EMPTY;
  }

  hasGoodConnection(): boolean {
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];
      const effectiveType = conn.effectiveType || '';
      console.log(effectiveType);
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }
    return true;
  }
}