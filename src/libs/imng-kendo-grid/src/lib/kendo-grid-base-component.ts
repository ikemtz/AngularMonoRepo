import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp, getRelatedValue } from 'imng-nrsrx-client-utils';

@Component({ template: '' })
export abstract class KendoGridBaseComponent<ENTITY>
  implements OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  public readonly ENUM_DISPLAY_TEXT = 'displayText';
  public readonly ENUM_NAME = 'name';
  public readonly getRelatedValue = getRelatedValue<ENTITY>;

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
