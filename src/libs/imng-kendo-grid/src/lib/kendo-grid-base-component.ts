import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp, getRelatedValue } from 'imng-nrsrx-client-utils';
import { menuIcon } from '@progress/kendo-svg-icons';
import {
  EnumProperties,
  getEnum,
  getEnumDisplayText,
  IEnumValue,
} from 'openapi-ts-generator/enums';

@Component({
    template: '',
    standalone: false
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class KendoGridBaseComponent<ENTITY>
  implements OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  public readonly EnumProperties = EnumProperties;
  public readonly getRelatedValue = getRelatedValue;
  public icons = {
    menuIcon: menuIcon,
  };

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
    looupValue: string,
  ): string | undefined {
    return getEnumDisplayText(data, looupValue);
  }
  public getEnum(
    data: IEnumValue[],
    looupValue: string,
  ): IEnumValue | undefined {
    return getEnum(data, looupValue);
  }
  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
