import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp } from 'imng-nrsrx-client-utils';

@Component({ template: '' })
export abstract class KendoGridBaseComponent<ENTITY> implements OnDestroy, Subscribable {
  public readonly allSubscriptions = new Subscriptions();

  public getExportFileName(exportName: string): string {
    return `${exportName}-${toLocalTimeStamp()}`;
  }
  public getRelatedValue(obj: ENTITY, ...segments: string[]): unknown | undefined | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = obj;//NOSONAR
    segments.forEach(segment => {
      if (result) {
        result = result[segment];
      }
    });
    return result;
  }

  public getRelatedField(...segments: string[]): string {
    return segments.join('.');
  }
  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
