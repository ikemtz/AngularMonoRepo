import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp } from 'imng-nrsrx-client-utils';

@Component({ template: '' })
export abstract class KendoGridBaseComponent<ENTITY> implements OnDestroy, Subscribable {
  public readonly allSubscriptions = new Subscriptions();

  public getExportFileName(exportName: string): string {
    return `${exportName}-${toLocalTimeStamp()}`;
  }
  public getRelatedValue(obj: ENTITY, parentPropertyName: string, valueProperty: string): unknown | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentProp = (obj as any)?.[parentPropertyName]; //NOSONAR
    return parentProp?.[valueProperty];
  }

  public getRelatedField(parentPropertyName: string, valueProperty: string): string {
    return `${parentPropertyName}/${valueProperty}`;
  }
  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
