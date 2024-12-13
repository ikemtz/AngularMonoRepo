import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp, getRelatedValue } from 'imng-nrsrx-client-utils';
import { EnumProperties, IEnumValue } from 'openapi-ts-generator/enums';

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
  public getEnumKey(data: IEnumValue[], nameValue: string): number | undefined {
    return this.getEnum(data, nameValue)?.key;
  }
  public getEnumText(
    data: IEnumValue[],
    nameValue: string,
  ): string | undefined {
    return this.getEnum(data, nameValue)?.displayText;
  }
  public getEnum(
    data: IEnumValue[],
    nameValue: string,
  ): IEnumValue | undefined {
    return data.find((f) => f.name === nameValue);
  }
  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
