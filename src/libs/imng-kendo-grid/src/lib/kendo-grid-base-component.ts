import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp, getRelatedValue } from 'imng-nrsrx-client-utils';
import { EnumProperties } from 'openapi-ts-generator/interfaces';

@Component({ template: '' })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class KendoGridBaseComponent<ENTITY>
  implements OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  public readonly EnumProperties = EnumProperties;
  public readonly getRelatedValue = getRelatedValue;

  public getExportFileName(exportName: string): string {
    return `${exportName}-${toLocalTimeStamp()}`;
  }

  public getRelatedField(...segments: string[]): string {
    return segments.join('.');
  }
  public getEnumText(
    data: { name: string; displayText: string }[],
    nameValue: string,
  ): string | undefined {
    return data.find((f) => f.name === nameValue)?.displayText;
  }
  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
